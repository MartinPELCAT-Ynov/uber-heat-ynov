import { IsDate } from "class-validator";
import { Field, ObjectType } from "type-graphql";
import { Column, Entity, ManyToMany } from "typeorm";
import AbstractBaseEntity from "./AbstractBaseEntity";
import { Course } from "./Course";

@Entity()
@ObjectType()
export class ScheduledCourse extends AbstractBaseEntity {
  @Field()
  @ManyToMany(() => Course)
  course: Course;

  @Field()
  @Column()
  @IsDate()
  startDate: Date;

  @Field()
  @IsDate()
  @Column()
  endDate: Date;
}
