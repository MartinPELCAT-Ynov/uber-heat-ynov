import { compare } from "bcrypt";
import { Arg, Authorized, Ctx, Mutation, Query, Resolver } from "type-graphql";
import { Repository } from "typeorm";
import { InjectRepository } from "typeorm-typedi-extensions";
import { SignInInput, SignUpInput } from "../inputs/User";
import { ContextType } from "../types/ContextType";
import { User } from "../entity/User";
import { Service } from "typedi";

@Resolver()
@Service()
export class AuthenticationResolver {
  constructor(
    @InjectRepository(User) private readonly userRepository: Repository<User>
  ) {}

  @Mutation(() => User)
  async signUp(
    @Arg("user") { firstName, name, password }: SignUpInput
  ): Promise<User> {
    const user = this.userRepository.create({
      firstName,
      name,
      password,
      company: "",
      email: "",
      locked: false,
    });
    return await user.save();
  }

  @Mutation(() => User)
  async signIn(
    @Arg("user") { password, email }: SignInInput,
    @Ctx() { req }: ContextType
  ): Promise<User> {
    const user = await this.userRepository.findOne({ where: { email } });
    if (user) {
      const match = await compare(password, user.password);
      if (match) {
        delete user.password;
        req.session.user = user;
        return user;
      }
      throw new Error("No user found");
    } else {
      throw new Error("No user found");
    }
  }

  @Mutation(() => Boolean)
  @Authorized()
  async logout(@Ctx() { req }: ContextType): Promise<boolean> {
    return await new Promise((res, rej) => {
      try {
        req.session.destroy(() => {
          res(true);
        });
      } catch (error) {
        rej(error);
      }
    });
  }

  @Query(() => User, { nullable: true })
  async Me(@Ctx() { req }: ContextType) {
    return await this.userRepository.findOne(req.session.user.id);
  }
}
