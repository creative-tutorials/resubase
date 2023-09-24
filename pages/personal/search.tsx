import { useRouter } from "next/router";
import { useState } from "react";
import Head from "next/head";
import { Input } from "@/components/ui/input";
import { MagnifyingGlassIcon } from "@radix-ui/react-icons";
import { Cross2Icon } from "@radix-ui/react-icons";

export default function PersonalSearch() {
  const router = useRouter();
  const [search, setSearch] = useState("");

  const handleSearchRequest = async (event: { target: { value: any } }) => {
    const { value } = event.target;
    if (value !== "" || value !== undefined || value !== null) {
      setSearch(value);
    }
  };

  const handleEnterKeyPress = (event: { key: string; }) => {
    if (event.key === "Enter") {
      if (search === "") {
        return;
      } else {
        router.push(`/personal/result/${search}`)
      }
    }
  };

  return (
    <>
      <Head>
        <title>Resubase - Find anything dev related</title>
        <meta name="description" content="Your personal dev buddy" />
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
          content="Resubase - Find anything dev related"
        />
        <meta property="og:description" content="Your personal dev buddy" />
        <meta
          property="og:image"
          content="https://res.cloudinary.com/derbreilm/image/upload/v1693019282/brave_screenshot_localhost_1_hog6fw.png"
        />

        <meta name="twitter:card" content="summary_large_image" />
        <meta property="twitter:domain" content="resubase.vercel.app" />
        <meta property="twitter:url" content="https://resubase.vercel.app" />
        <meta
          name="twitter:title"
          content="Resubase - Find anything dev related"
        />
        <meta name="twitter:description" content="Your personal dev buddy" />
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
      <div className="w-full flex items-center justify-center min-h-screen p-3 md:p-10 lg:p-10">
        <div className="w-full max-w-md relative flex flex-col gap-3">
          <div className="text-center">
            <h3 className="text-white text-3xl font-semibold font-mono">
              Resubase
            </h3>
          </div>
          <MagnifyingGlassIcon className="w-5 h-5 text-light-purple absolute left-2 top-[62px]" />
          <Input
            type="text"
            placeholder="Search anything dev related"
            className="border border-metal/20 text-light-purple p-6 px-8"
            onChange={handleSearchRequest}
            onKeyUp={handleEnterKeyPress}
            value={search}
          />
          <Cross2Icon className="w-5 h-5 text-light-purple absolute right-2 top-[62px] cursor-pointer" onClick={() => setSearch("")} />
        </div>
      </div>
    </>
  );
}
