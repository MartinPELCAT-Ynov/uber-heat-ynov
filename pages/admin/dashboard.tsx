import { Layout } from "@components/layouts";
import { withSession } from "../../middlewares/withSession";
import { GetServerSideProps } from "next";
import { useForm } from "react-hook-form";
import { useImportProductFromCsvMutation } from "@generated";
import { Spinner } from "@components/Spinner";
import { useState } from "react";
import clsx from "clsx";

const DashBoard = () => {
  const { register, handleSubmit } = useForm<{ file: FileList }>();
  const [file, setFile] = useState(null);

  const [
    importProductMutation,
    { called, loading },
  ] = useImportProductFromCsvMutation();

  const onSubmit = handleSubmit(async (values) => {
    try {
      const file = values.file[0];
      await importProductMutation({ variables: { file } });
    } catch (error) {
      console.log(error);
    }
  });

  return (
    <Layout>
      <div className="flex-1">
        <form
          onSubmit={onSubmit}
          className="bg-gray-100 rounded-lg p-4 flex justify-between align-middle"
        >
          <div className="flex items-center space-x-2">
            <label
              htmlFor="file"
              className="cursor-pointer font-bold border bg-indigo-400 py-2 px-4 rounded-md text-white"
            >
              Importer un fichier de produits
            </label>
            {file && <span>{file.name}</span>}
            <input
              type="file"
              ref={register}
              onChange={(e) => setFile(e.currentTarget.files[0])}
              name="file"
              id="file"
              className="hidden"
            />
          </div>
          <button
            type="submit"
            disabled={!file}
            className={clsx(
              !file && "bg-opacity-50",
              "flex bg-green-400 text-white font-bold py-2 px-4 rounded-md items-center"
            )}
          >
            {called && loading && <Spinner />}
            <div>Valider</div>
          </button>
        </form>
      </div>
    </Layout>
  );
};

export default DashBoard;

export const getServerSideProps: GetServerSideProps = withSession(
  async (_, user) => {
    return { props: { user } };
  }
);
