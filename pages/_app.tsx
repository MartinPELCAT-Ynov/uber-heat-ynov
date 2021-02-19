import { ApolloClient, ApolloProvider, InMemoryCache } from "@apollo/client";
import { SessionContextProvider } from "@components/contexts/SessionContext";
import { AppProps } from "next/dist/next-server/lib/router/router";
import { createUploadLink } from "apollo-upload-client";
import "tailwindcss/tailwind.css";

const client = new ApolloClient({
  uri: "http://localhost:3000/api/gql",
  cache: new InMemoryCache(),
  link: createUploadLink({ uri: "http://localhost:3000/api/gql" }),
});

const App = ({ Component, pageProps }: AppProps) => {
  return (
    <ApolloProvider client={client}>
      <SessionContextProvider user={pageProps.user}>
        <Component {...pageProps} />
      </SessionContextProvider>
    </ApolloProvider>
  );
};

export default App;
