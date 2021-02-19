import { Layout } from "@components/layouts";
import { withSession } from "../middlewares/withSession";
import { GetServerSideProps } from "next";

export default function Home() {
  return <Layout>Search engine HERE</Layout>;
}

export const getServerSideProps: GetServerSideProps = withSession(
  async (_, user) => {
    return { props: { user } };
  }
);
