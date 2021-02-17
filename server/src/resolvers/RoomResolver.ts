import { Room } from "@entity/Room";
import { Arg, Query, Resolver } from "type-graphql";
import { Service } from "typedi";
import { Repository } from "typeorm";
import { InjectRepository } from "typeorm-typedi-extensions";

@Service()
@Resolver()
export class RoomResolver {
  constructor(
    @InjectRepository(Room) private readonly roomRepository: Repository<Room>
  ) {}

  @Query(() => Room, { nullable: true })
  async getRoom(@Arg("roomId", () => String) roomId: string) {
    return this.roomRepository.findOne({ where: { _id: roomId } });
  }
}
