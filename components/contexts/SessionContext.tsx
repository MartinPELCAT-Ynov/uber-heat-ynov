import React, { createContext, FC } from "react";
import { User } from "server/src/entity/User";

export type ContextSessionUser = Pick<
  User,
  "id" | "name" | "firstName" | "email" | "company" | "locked" | "role"
>;

type SessionContextType = {
  user?: ContextSessionUser;
};

export const SessionContext = createContext<SessionContextType>(undefined);

export const SessionContextProvider: FC<SessionContextType> = ({
  children,
  user,
}) => (
  <SessionContext.Provider value={{ user }}>{children}</SessionContext.Provider>
);
