import { AuthChecker } from "type-graphql";
import { ContextType } from "../types/ContextType";

export const authChecker: AuthChecker<ContextType> = async (
  { context },
  roles
) => {
  const user = context.req.session.user;
  if (!user) return false;
  if (!roles) return true;

  if (roles && roles.includes(user.role)) return true;

  return false;
};
