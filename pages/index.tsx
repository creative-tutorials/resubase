import Head from "next/head";
import Sidebar from "@/components/main/Sidebar";
import { Inter } from "next/font/google";
import styles from "@/styles/Home.module.css";
import Header from "@/components/main/Header";
import { useState } from "react";

const inter = Inter({ subsets: ["latin"] });


export default function Home() {
  const [isSidebarActive, setIsSidebarActive] = useState(false);

  return (
    <>
      <Head>
        <title>Resubase/Home</title>
        <meta name="description" content="Welcome to the resubase community" />
        <meta
          name="keywords"
          content="Programming, Learn Coding, Resubase, Coding Challenge, ResuAI, ResuChat"
        />
        <meta
          name="google-site-verification"
          content="l1a2fyP4jz21WqSIR2HNxLAyt__hUNkV-48f_zbVHYE"
        />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta property="og:url" content="https://resubase.vercel.app" />
        <meta property="og:type" content="website" />
        <meta property="og:title" content="Resubase/Home" />
        <meta
          property="og:description"
          content="Welcome to the resubase community"
        />
        <meta
          property="og:image"
          content="https://res.cloudinary.com/derbreilm/image/upload/v1693019282/brave_screenshot_localhost_1_hog6fw.png"
        />

        <meta name="twitter:card" content="summary_large_image" />
        <meta property="twitter:domain" content="resubase.vercel.app" />
        <meta property="twitter:url" content="https://resubase.vercel.app" />
        <meta name="twitter:title" content="Resubase/Home" />
        <meta
          name="twitter:description"
          content="Welcome to the resubase community"
        />
        <meta
          name="twitter:image"
          content="https://res.cloudinary.com/derbreilm/image/upload/v1693019282/brave_screenshot_localhost_1_hog6fw.png"
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
      </Head>
      <main className={`${styles.main}`}>
        <Header styles={styles} setIsSidebarActive={setIsSidebarActive} />
        <Sidebar
          styles={styles}
          isSidebarActive={isSidebarActive}
          setIsSidebarActive={setIsSidebarActive}
        />
        <p>Redirecting....</p>
      </main>
    </>
  );
}
