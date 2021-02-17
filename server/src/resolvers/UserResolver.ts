import { User } from "@entity/User";
import { Arg, Ctx, Query, Resolver } from "type-graphql";
import { Service } from "typedi";
import { Repository } from "typeorm";
import { InjectRepository } from "typeorm-typedi-extensions";
import { ContextType } from "../types/ContextType";

@Service()
@Resolver(() => User)
export class UserResolver {
  constructor(
    @InjectRepository(User) private readonly userRepository: Repository<User>
  ) {}

  @Query(() => User, { nullable: true })
  async user(
    @Arg("userId", () => String)
    userId: string
  ): Promise<User> {
    return this.userRepository.findOne(userId);
  }

  @Query(() => [User])
  async users(@Ctx() { req }: ContextType) {
    const users = await this.userRepository.find();
    req.session.user = users[0];
    return users;
  }
}
