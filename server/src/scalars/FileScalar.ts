import { Field, ObjectType } from "type-graphql";
import { ReadStream } from "fs";

@ObjectType()
export class FileScalar implements Partial<FileType> {
  @Field()
  filename: string;

  @Field()
  mimetype: string;

  @Field()
  encoding: string;
}

export interface FileType {
  filename: string;
  mimetype: string;
  encoding: string;
  createReadStream(): ReadStream;
}
