import { AuthChecker } from "type-graphql";
import { ContextType } from "../types/ContextType";

// { root, args, context, info }, roles
// Ce sont les parametres
export const authChecker: AuthChecker<ContextType> = async () => {
  return true;
  // try {
  //   const token = context.req.signedCookies["_token"];

  //   if (roles.length === 0) {
  //     return token !== undefined;
  //   }

  //   const userRepository = getRepository(User);

  //   const user = await userRepository.findOne({
  //     where: { token },
  //     relations: ["roles"],
  //   });

  //   if (!user) return false;
  //   const userRoles = await (user.roles as Promise<Role[]>);

  //   return roles.some((role) => {
  //     return userRoles.findIndex((usrRole) => usrRole.name === role) !== -1;
  //   });
  // } catch (error) {
  //   console.log(error);
  //   return false;
  // }
};
