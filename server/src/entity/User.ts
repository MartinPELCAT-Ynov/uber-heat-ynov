import { hash } from "bcrypt";
import { IsEmail } from "class-validator";
import { Field, ObjectType } from "type-graphql";
import {
  Entity,
  Column,
  BeforeInsert,
  PrimaryGeneratedColumn,
  BaseEntity,
} from "typeorm";

@Entity()
@ObjectType()
export class User extends BaseEntity {
  @PrimaryGeneratedColumn("uuid")
  @Field()
  id?: string;

  @Column()
  @Field()
  name!: string;

  @Column()
  @Field()
  firstName!: string;

  @Column({ unique: true })
  @IsEmail()
  @Field()
  email!: string;

  @Column({ nullable: true })
  @Field()
  company?: string;

  @Column("bool", { default: true })
  @Field()
  locked!: boolean;

  @Column("character varying", { array: true, nullable: true })
  @Field(() => [String])
  roles?: string[];

  @Column()
  password!: string;

  @BeforeInsert()
  async beforeInset() {
    const { password } = this;
    this.password = await hash(password, 4);
  }
}
