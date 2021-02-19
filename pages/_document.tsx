import Document, { Html, Head, Main, NextScript } from "next/document";

export default class CustomDocument extends Document {
  render() {
    return (
      <Html>
        <Head />
        <head>
          <title>UberHeat</title>
        </head>
        <body className="antialiased min-h-screen font-Poppins text-black-light">
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}
