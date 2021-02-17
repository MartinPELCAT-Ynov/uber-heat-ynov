import { gql } from "@apollo/client";
import * as Apollo from "@apollo/client";
export type Maybe<T> = T | null;
export type Exact<T extends { [key: string]: unknown }> = {
  [K in keyof T]: T[K];
};
export type MakeOptional<T, K extends keyof T> = Omit<T, K> &
  { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> &
  { [SubKey in K]: Maybe<T[SubKey]> };
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
  /** The javascript `Date` as string. Type represents date and time as the ISO Date string. */
  DateTime: any;
};

export type Query = {
  __typename?: "Query";
  signIn: User;
  getUserFromToken?: Maybe<User>;
  user?: Maybe<User>;
  users: Array<User>;
  getRoom?: Maybe<Room>;
};

export type QuerySignInArgs = {
  user: SignInInput;
};

export type QueryGetUserFromTokenArgs = {
  token: Scalars["String"];
};

export type QueryUserArgs = {
  userId: Scalars["String"];
};

export type QueryGetRoomArgs = {
  roomId: Scalars["String"];
};

/** General database */
export type User = {
  __typename?: "User";
  _id: Scalars["String"];
  createdAt: Scalars["DateTime"];
  updatedAt: Scalars["DateTime"];
  deletedAt: Scalars["DateTime"];
  firstName: Scalars["String"];
  lastName: Scalars["String"];
  username: Scalars["String"];
  roles?: Maybe<Array<Scalars["String"]>>;
};

export type SignInInput = {
  username: Scalars["String"];
  password: Scalars["String"];
};

export type Room = {
  __typename?: "Room";
  _id: Scalars["String"];
  createdAt: Scalars["DateTime"];
  updatedAt: Scalars["DateTime"];
  deletedAt: Scalars["DateTime"];
  name: Scalars["String"];
};

export type Mutation = {
  __typename?: "Mutation";
  signUp: User;
};

export type MutationSignUpArgs = {
  user: SignUpInput;
};

export type SignUpInput = {
  firstName: Scalars["String"];
  lastName: Scalars["String"];
  password: Scalars["String"];
  username: Scalars["String"];
};

export type GetUsersQueryVariables = Exact<{ [key: string]: never }>;

export type GetUsersQuery = { __typename?: "Query" } & {
  users: Array<
    { __typename?: "User" } & Pick<User, "firstName" | "lastName" | "roles">
  >;
};

export const GetUsersDocument = gql`
  query getUsers {
    users {
      firstName
      lastName
      roles
    }
  }
`;

/**
 * __useGetUsersQuery__
 *
 * To run a query within a React component, call `useGetUsersQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetUsersQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetUsersQuery({
 *   variables: {
 *   },
 * });
 */
export function useGetUsersQuery(
  baseOptions?: Apollo.QueryHookOptions<GetUsersQuery, GetUsersQueryVariables>
) {
  return Apollo.useQuery<GetUsersQuery, GetUsersQueryVariables>(
    GetUsersDocument,
    baseOptions
  );
}
export function useGetUsersLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<
    GetUsersQuery,
    GetUsersQueryVariables
  >
) {
  return Apollo.useLazyQuery<GetUsersQuery, GetUsersQueryVariables>(
    GetUsersDocument,
    baseOptions
  );
}
export type GetUsersQueryHookResult = ReturnType<typeof useGetUsersQuery>;
export type GetUsersLazyQueryHookResult = ReturnType<
  typeof useGetUsersLazyQuery
>;
export type GetUsersQueryResult = Apollo.QueryResult<
  GetUsersQuery,
  GetUsersQueryVariables
>;
