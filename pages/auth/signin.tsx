import { Spinner } from "@components/Spinner";
import {
  SignInMutationVariables,
  useSignInMutation,
} from "apollo/__generated__";
import { useForm } from "react-hook-form";
import { useRouter } from "next/router";

const SignIn = () => {
  const { register, handleSubmit } = useForm<
    SignInMutationVariables["inputs"]
  >();

  const { push } = useRouter();
  const [signIn, { called, loading, error }] = useSignInMutation();

  const onSubmit = handleSubmit(async (inputs) => {
    try {
      await signIn({ variables: { inputs } });
      push("/");
    } catch (error) {
      //Dont do anything
    }
  });

  return (
    <div className="min-h-screen flex justify-center items-center">
      <div className="bg-blue-100 p-5 w-1/4 rounded-xl">
        <form onSubmit={onSubmit} className="space-y-5">
          <div>
            <input
              type="email"
              ref={register}
              name="email"
              placeholder="Email"
              className="w-full px-2 py-3 rounded-lg"
            />
          </div>
          <div>
            <input
              type="password"
              ref={register}
              name="password"
              placeholder="Password"
              className="w-full px-2 py-3 rounded-lg"
            />
          </div>
          <div>
            <button
              type="submit"
              className="w-full px-2 py-3 rounded-lg bg-blue-200 flex justify-center "
            >
              <div>{called && loading && <Spinner />}</div>
              <div>Se connecter</div>
            </button>
          </div>
          {error && (
            <div className="border border-red-300 bg-red-200 text-red-700 text-center py-2 rounded-lg">
              {error.message}
            </div>
          )}
        </form>
      </div>
    </div>
  );
};

export default SignIn;
