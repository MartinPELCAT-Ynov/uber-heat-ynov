import { Layout } from "@components/layouts";
import { withSession } from "@middlewares/withSession";
import { GetServerSideProps } from "next";

export default function Home() {
  return <Layout>Layout</Layout>;
}

export const getServerSideProps: GetServerSideProps = withSession(
  async (_, user) => {
    return { props: { user } };
  }
);
