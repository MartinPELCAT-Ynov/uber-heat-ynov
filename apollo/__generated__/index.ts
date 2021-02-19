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
  /** The `Upload` scalar type represents a file upload. */
  Upload: any;
};

export type Query = {
  __typename?: "Query";
  Me?: Maybe<User>;
  user?: Maybe<User>;
  users: Array<User>;
  products: Array<Product>;
};

export type QueryUserArgs = {
  userId: Scalars["String"];
};

export type User = {
  __typename?: "User";
  id: Scalars["String"];
  name: Scalars["String"];
  firstName: Scalars["String"];
  email: Scalars["String"];
  company: Scalars["String"];
  locked: Scalars["Boolean"];
  roles: Array<Scalars["String"]>;
};

export type Product = {
  __typename?: "Product";
  id: Scalars["String"];
  name: Scalars["String"];
  basePrice: Scalars["Float"];
  configurations: Array<ProductConfigurationUnion>;
};

export type ProductConfigurationUnion =
  | CircProductConfiguration
  | RectProductConfiguration;

export type CircProductConfiguration = ProductConfiguration & {
  __typename?: "CircProductConfiguration";
  id: Scalars["String"];
  depth: Scalars["Float"];
  db1: Scalars["Float"];
  db2: Scalars["Float"];
  db5: Scalars["Float"];
  db10: Scalars["Float"];
  surface: Scalars["Float"];
  diameter: Scalars["Float"];
};

export type ProductConfiguration = {
  id: Scalars["String"];
  depth: Scalars["Float"];
  db1: Scalars["Float"];
  db2: Scalars["Float"];
  db5: Scalars["Float"];
  db10: Scalars["Float"];
  surface: Scalars["Float"];
};

export type RectProductConfiguration = ProductConfiguration & {
  __typename?: "RectProductConfiguration";
  id: Scalars["String"];
  depth: Scalars["Float"];
  db1: Scalars["Float"];
  db2: Scalars["Float"];
  db5: Scalars["Float"];
  db10: Scalars["Float"];
  surface: Scalars["Float"];
  width: Scalars["Float"];
  height: Scalars["Float"];
  thickness: Scalars["Float"];
};

export type Mutation = {
  __typename?: "Mutation";
  signUp: User;
  signIn: User;
  addProduct: Product;
  importProductsFromCsv: FileScalar;
};

export type MutationSignUpArgs = {
  user: SignUpInput;
};

export type MutationSignInArgs = {
  user: SignInInput;
};

export type MutationAddProductArgs = {
  data: CreateProductInput;
};

export type MutationImportProductsFromCsvArgs = {
  file: Scalars["Upload"];
};

export type SignUpInput = {
  firstName: Scalars["String"];
  name: Scalars["String"];
  password: Scalars["String"];
};

export type SignInInput = {
  email: Scalars["String"];
  password: Scalars["String"];
};

export type CreateProductInput = {
  basePrice: Scalars["Float"];
  name: Scalars["String"];
  rectConfigs?: Maybe<Array<RectProductConfigurationInput>>;
  circConfigs?: Maybe<Array<CircProductConfigurationInput>>;
};

export type RectProductConfigurationInput = {
  depth: Scalars["Float"];
  db1: Scalars["Float"];
  db2: Scalars["Float"];
  db5: Scalars["Float"];
  db10: Scalars["Float"];
  width: Scalars["Float"];
  height: Scalars["Float"];
  thickness: Scalars["Float"];
};

export type CircProductConfigurationInput = {
  depth: Scalars["Float"];
  db1: Scalars["Float"];
  db2: Scalars["Float"];
  db5: Scalars["Float"];
  db10: Scalars["Float"];
  diameter: Scalars["Float"];
};

export type FileScalar = {
  __typename?: "FileScalar";
  filename: Scalars["String"];
  mimetype: Scalars["String"];
  encoding: Scalars["String"];
};

export type ImportProductFromCsvMutationVariables = Exact<{
  file: Scalars["Upload"];
}>;

export type ImportProductFromCsvMutation = { __typename?: "Mutation" } & {
  importProductsFromCsv: { __typename?: "FileScalar" } & Pick<
    FileScalar,
    "filename" | "mimetype" | "encoding"
  >;
};

export type SignInMutationVariables = Exact<{
  inputs: SignInInput;
}>;

export type SignInMutation = { __typename?: "Mutation" } & {
  signIn: { __typename?: "User" } & UserFieldsFragment;
};

export type UserFieldsFragment = { __typename?: "User" } & Pick<
  User,
  "name" | "firstName" | "email" | "id"
>;

export const UserFieldsFragmentDoc = gql`
  fragment UserFields on User {
    name
    firstName
    email
    id
  }
`;
export const ImportProductFromCsvDocument = gql`
  mutation importProductFromCsv($file: Upload!) {
    importProductsFromCsv(file: $file) {
      filename
      mimetype
      encoding
    }
  }
`;
export type ImportProductFromCsvMutationFn = Apollo.MutationFunction<
  ImportProductFromCsvMutation,
  ImportProductFromCsvMutationVariables
>;

/**
 * __useImportProductFromCsvMutation__
 *
 * To run a mutation, you first call `useImportProductFromCsvMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useImportProductFromCsvMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [importProductFromCsvMutation, { data, loading, error }] = useImportProductFromCsvMutation({
 *   variables: {
 *      file: // value for 'file'
 *   },
 * });
 */
export function useImportProductFromCsvMutation(
  baseOptions?: Apollo.MutationHookOptions<
    ImportProductFromCsvMutation,
    ImportProductFromCsvMutationVariables
  >
) {
  return Apollo.useMutation<
    ImportProductFromCsvMutation,
    ImportProductFromCsvMutationVariables
  >(ImportProductFromCsvDocument, baseOptions);
}
export type ImportProductFromCsvMutationHookResult = ReturnType<
  typeof useImportProductFromCsvMutation
>;
export type ImportProductFromCsvMutationResult = Apollo.MutationResult<ImportProductFromCsvMutation>;
export type ImportProductFromCsvMutationOptions = Apollo.BaseMutationOptions<
  ImportProductFromCsvMutation,
  ImportProductFromCsvMutationVariables
>;
export const SignInDocument = gql`
  mutation SignIn($inputs: SignInInput!) {
    signIn(user: $inputs) {
      ...UserFields
    }
  }
  ${UserFieldsFragmentDoc}
`;
export type SignInMutationFn = Apollo.MutationFunction<
  SignInMutation,
  SignInMutationVariables
>;

/**
 * __useSignInMutation__
 *
 * To run a mutation, you first call `useSignInMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useSignInMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [signInMutation, { data, loading, error }] = useSignInMutation({
 *   variables: {
 *      inputs: // value for 'inputs'
 *   },
 * });
 */
export function useSignInMutation(
  baseOptions?: Apollo.MutationHookOptions<
    SignInMutation,
    SignInMutationVariables
  >
) {
  return Apollo.useMutation<SignInMutation, SignInMutationVariables>(
    SignInDocument,
    baseOptions
  );
}
export type SignInMutationHookResult = ReturnType<typeof useSignInMutation>;
export type SignInMutationResult = Apollo.MutationResult<SignInMutation>;
export type SignInMutationOptions = Apollo.BaseMutationOptions<
  SignInMutation,
  SignInMutationVariables
>;
