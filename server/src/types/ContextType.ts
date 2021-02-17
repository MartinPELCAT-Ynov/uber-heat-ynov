import { Response, Request } from "express";
import { User } from "../entity/User";
export type ContextType = {
  res: Response;
  req: Request & { session: { user: User } };
};
