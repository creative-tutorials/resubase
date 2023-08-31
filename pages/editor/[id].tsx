import Head from "next/head";
import { useRouter } from "next/router";

export default function EmbedCode() {
  const router = useRouter();
  const { id } = router.query;
  return (
    <>
      <Head>
        <title>Resubase</title>
        <meta
          name="description"
          content="Interactive, fun, challenging challenges from beginner to expert level"
        />
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
        <meta
          property="og:title"
          content={`Resubase`}
        />
        <meta
          property="og:description"
          content="Interactive, fun, challenging challenges from beginner to expert level"
        />
        <meta
          property="og:image"
          content="https://res.cloudinary.com/derbreilm/image/upload/v1693019282/brave_screenshot_localhost_1_hog6fw.png"
        />

        <meta name="twitter:card" content="summary_large_image" />
        <meta property="twitter:domain" content="resubase.vercel.app" />
        <meta property="twitter:url" content="https://resubase.vercel.app" />
        <meta
          name="twitter:title"
          content={`Resubase`}
        />
        <meta
          name="twitter:description"
          content="Interactive, fun, challenging challenges from beginner to expert level"
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
      <div className="w-[100%] h-[100%] p-5">
        <iframe
          className={"border-none rounded-md w-[100%] h-[700px]"}
          // width="800"
          // height="450"
          src="https://codesandbox.io/p/sandbox/jolly-dijkstra-yzl475?file=%2Fdist%2Foutput.css%3A1%2C1&embed=1"
          // allowFullscreen
        ></iframe>
      </div>
    </>
  );
}
