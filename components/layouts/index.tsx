import { Header } from "@components/header";
import { FC } from "react";

export const Layout: FC = ({ children }) => {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <div className="flex flex-1 p-8">{children}</div>
    </div>
  );
};
