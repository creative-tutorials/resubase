import { SignUp } from "@clerk/nextjs";
import ath from "@/styles/auth.module.css";
import Head from "next/head";

export default function Page() {
  return (
    <>
      <Head>
        <title>Resubase - Sign Up Page</title>
        <meta
          name="description"
          content="Sign up to start asking your questions"
        />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta
          name="twitter:card"
          content="Resubase is a powerful platform designed to cater to the needs of developers worldwide."
        />
        <meta name="twitter:site" content="Resubase" />
        <meta name="twitter:creator" content="@timi" />
        <meta property="og:url" content="resubase.vercel.app" />
        <meta
          property="og:title"
          content="Resubase is a powerful platform designed to cater to the needs of developers worldwide."
        />
        <link
          rel="apple-touch-icon"
          sizes="180x180"
          href="/app/apple-touch-icon.png"
        />
        <link
          rel="icon"
          type="image/png"
          sizes="32x32"
          href="/app/favicon-32x32.png"
        />
        <link
          rel="icon"
          type="image/png"
          sizes="16x16"
          href="/app/favicon-16x16.png"
        />
        <link rel="manifest" href="/app/site.webmanifest" />
      </Head>
      <div className={ath.wrapper}>
        <SignUp />
      </div>
    </>
  );
}
