import { Request } from "express";
import { GetServerSidePropsContext, GetServerSidePropsResult } from "next";
import { ParsedUrlQuery } from "querystring";
import { User } from "server/src/entity/User";
import { ContextType } from "server/src/types/ContextType";

export type ServerSideConnectedProps = { user: User | undefined };

export const getConnectedUser = ({ req }: ContextType): User | null => {
  return req.session.user || null;
};

export const withSession = <
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

export const redirectPath = (
  redirectUrl: string
): { redirect: { destination: string; permanent: boolean } } => {
  return {
    redirect: {
      destination: redirectUrl === "/" ? "/auth/signin" : `/auth/signin`,
      permanent: false,
    },
  };
};
