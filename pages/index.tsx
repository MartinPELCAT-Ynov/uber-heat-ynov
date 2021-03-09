import { Layout } from "@components/layouts";
import { withSession } from "../middlewares/withSession";
import { GetServerSideProps } from "next";
import { useSignInMutation } from "apollo/__generated__";
import { useEffect } from "react";

export default function Home() {
  const [mutation] = useSignInMutation();
  useEffect(() => {
    mutation({ variables: { inputs: { email: "", password: "" } } }).catch(
      console.error
    );
  }, []);

  return <Layout>Search engine HERE</Layout>;
}

export const getServerSideProps: GetServerSideProps = withSession(
  async (_, user) => {
    return { props: { user } };
  }
);
