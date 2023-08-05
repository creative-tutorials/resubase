import { SignIn } from "@clerk/nextjs";
import ath from "@/styles/auth.module.css";
import Head from "next/head";

export default function Page() {
  return (
    <>
      <Head>
        <title>Resubase - Sign In Page</title>
        <meta
          name="description"
          content="Sign in to start asking your questions"
        />
        <meta name="google-site-verification" content="l1a2fyP4jz21WqSIR2HNxLAyt__hUNkV-48f_zbVHYE" />
        <meta
          name="twitter:card"
          content="Resubase is a powerful platform designed to cater to the needs of developers worldwide."
        />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
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
        href="/apple-touch-icon.png?v=2"
      />
      <link
        rel="icon"
        type="image/png"
        sizes="32x32"
        href="/favicon-32x32.png?v=2"
      />
      <link
        rel="icon"
        type="image/png"
        sizes="16x16"
        href="/favicon-16x16.png?v=2"
      />
      <link rel="icon" href="/favicon.ico?v=2" sizes="any" />
      <link rel="manifest" href="/site.webmanifest" />
      </Head>
      <div className={ath.wrapper}>
        <SignIn />
      </div>
    </>
  );
}
