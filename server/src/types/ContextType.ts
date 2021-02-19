import { User } from "../entity/User";
import { Response, Request } from "express";
export type ContextType = {
  res: Response;
  req: Request & { session: { user?: User } };
};
