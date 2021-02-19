import { Layout } from "@components/layouts";
import { withSession } from "@middlewares/withSession";
import { GetServerSideProps } from "next";
import { useForm } from "react-hook-form";
import { useImportProductFromCsvMutation } from "@generated";

const DashBoard = () => {
  const { register, handleSubmit } = useForm<{ file: FileList }>();

  const [importProductMutation] = useImportProductFromCsvMutation();

  const onSubmit = handleSubmit((values) => {
    try {
      const file = values.file[0];
      importProductMutation({ variables: { file } });
    } catch (error) {
      console.log(error);
    }
  });

  return (
    <Layout>
      <form onSubmit={onSubmit}>
        <input type="file" ref={register} name="file" />
        <button type="submit">Valider</button>
      </form>
    </Layout>
  );
};

export default DashBoard;

export const getServerSideProps: GetServerSideProps = withSession(
  async (_, user) => {
    return { props: { user } };
  }
);
