import { User } from "@entity/User";
import React, { createContext, FC } from "react";

export type ContextSessionUser = Pick<
  User,
  "id" | "name" | "firstName" | "email" | "company" | "locked" | "roles"
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
