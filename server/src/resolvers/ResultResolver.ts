import {
  Resolver,
  UseMiddleware,
  MiddlewareFn,
  UnauthorizedError,
  Query,
  Arg,
} from "type-graphql";
import { Project } from "../entity/Project";
import { ContextType } from "../types/ContextType";

const ownProduct: MiddlewareFn<ContextType> = async (
  { context, args },
  next
) => {
  const user = context.req.session.user;
  if (!user) throw new UnauthorizedError();

  const result = await Project.findOne(args.resultId, {
    where: {
      user,
    },
  });
  if (result) await next();
};

@Resolver(() => Project)
export class ResulResolver {
  @Query(() => Project, { nullable: true })
  @UseMiddleware(ownProduct)
  async getResult(@Arg("resultId") resultId: string) {
    console.log(resultId);

    return null;
  }
}
