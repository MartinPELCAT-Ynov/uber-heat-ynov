import { User } from "@entity/User";
import { Request } from "express";
import { GetServerSidePropsContext, GetServerSidePropsResult } from "next";
import { ParsedUrlQuery } from "querystring";
import { ContextType } from "server/src/types/ContextType";

export type ServerSideConnectedProps = { user: User | undefined };

export const getConnectedUser = ({ req }: ContextType): User | null => {
  return req.session.user || null;
};

export const withAuthentication = <
  P extends { [key: string]: unknown } = { [key: string]: unknown },
  Q extends ParsedUrlQuery = ParsedUrlQuery
>(
  cb: (
    context: GetServerSidePropsContext<Q>,
    user: User
  ) => Promise<GetServerSidePropsResult<P & ServerSideConnectedProps>>
) => {
  return async (context: GetServerSidePropsContext<Q>) => {
    const user = getConnectedUser((context as unknown) as ContextType);
    if (!user) {
      return redirectPath((context.req as Request).url);
    }
    return cb(context, user);
  };
};

const redirectPath = (
  redirectUrl: string
): { redirect: { destination: string; permanent: boolean } } => {
  return {
    redirect: {
      destination:
        redirectUrl === "/"
          ? "/auth/login"
          : `/auth/login?redirect_to=${encodeURIComponent(redirectUrl)}`,
      permanent: false,
    },
  };
};
