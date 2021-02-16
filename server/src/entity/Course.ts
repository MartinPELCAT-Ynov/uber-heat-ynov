import { Field, ObjectType } from "type-graphql";
import { Column, Entity, JoinTable, ManyToMany, ManyToOne } from "typeorm";
import AbstractBaseEntity from "./AbstractBaseEntity";
import { Room } from "./Room";
import { User } from "./User";

@Entity()
@ObjectType()
export class Course extends AbstractBaseEntity {
  @Field(() => [User])
  @ManyToMany(() => User)
  @JoinTable()
  students: User[];

  @Field(() => Room)
  @ManyToOne(() => Room)
  room: Room;

  @Field(() => User)
  @ManyToOne(() => User)
  teacher?: User;

  @Column()
  @Field()
  totalHours: number;

  @Field()
  remainingHours: number;
}
