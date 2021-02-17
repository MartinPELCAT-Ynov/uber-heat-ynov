import { compare } from "bcrypt";
import { Arg, Ctx, Mutation, Query, Resolver } from "type-graphql";
import { Repository } from "typeorm";
import { InjectRepository } from "typeorm-typedi-extensions";
import { SignInInput, SignUpInput } from "../inputs/User";
import { ContextType } from "../types/ContextType";
import { User } from "@entity/User";

@Resolver()
export class AuthenticationResolver {
  constructor(
    @InjectRepository(User) private readonly userRepository: Repository<User>
  ) {}

  @Mutation(() => User)
  async signUp(
    @Arg("user") { firstName, lastName, password, username }: SignUpInput
  ): Promise<User> {
    const user = this.userRepository.create({
      firstName,
      lastName,
      password,
      username,
    });
    return await user.save();
  }

  @Query(() => User)
  async signIn(
    @Arg("user") { password, username }: SignInInput,
    @Ctx() { req }: ContextType
  ): Promise<User> {
    const user = await this.userRepository.findOne({ where: { username } });
    if (user) {
      const match = await compare(password, user.password);
      if (match) {
        req.session.user = user;
        return user;
      }
      throw new Error("No user found");
    } else {
      throw new Error("No user found");
    }
  }

  @Query(() => User, { nullable: true })
  async getUserFromToken(@Arg("token", () => String) token: string) {
    return await this.userRepository.findOne({
      where: { token },
    });
  }
}
