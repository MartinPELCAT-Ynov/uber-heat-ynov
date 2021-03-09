import { Field, InputType } from "type-graphql";
import { User } from "../entity/User";

@InputType()
export class SignUpInput implements Partial<User> {
  @Field()
  firstName: string;

  @Field()
  name: string;

  @Field()
  password: string;
}

@InputType()
export class SignInInput implements Partial<User> {
  @Field(() => String)
  email: string;

  @Field(() => String)
  password: string;
}
