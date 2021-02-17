import { useGetUsersQuery } from "apollo/__generated__";

export default function Home() {
  const { data } = useGetUsersQuery();
  console.log(data);

  return <div className="bg-red-400 text-6xl">Home</div>;
}
