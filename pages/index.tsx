import { useGetUsersQuery } from "@generated";

export default function Home() {
  const { data } = useGetUsersQuery();
  console.log(data?.users);

  return <div className="bg-red-400 text-6xl">Home</div>;
}
