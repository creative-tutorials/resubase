import Image from "next/image";
import Head from "next/head";
import { useState, useEffect, Fragment } from "react";
import axios from "axios";

import { Skeleton } from "@/components/ui/skeleton";

import { ToastAction } from "@/components/ui/toast";
import { useToast } from "@/components/ui/use-toast";
import { Toaster } from "@/components/ui/toaster";

import Header from "@/components/main/Header";
import Sidebar from "@/components/main/Sidebar";
import styles from '@/styles/Home.module.css';

type subDb = {
  userid: string;
  username: string;
  projectName: string;
  url: string;
  image: string;
  subID: string;
};

export default function Submissions() {
  const { toast } = useToast();
  const [counter, setCounter] = useState(0);
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isSidebarActive, setIsSidebarActive] = useState(false);

  useEffect(() => {
    setCounter((prev) => prev + 1);
    counter === 1 && getSubmission();

    return () => {
      setCounter(0);
    };
  }, [counter]);

  async function getSubmission() {
    setIsLoading(true);
    axios
      .get("https://api-resubase.vercel.app/submission", {
        headers: {
          "Content-Type": "application/json",
          apikey: process.env.NEXT_PUBLIC_SERVER_CONNECTION_APIKEY,
        },
      })
      .then(function (response) {
        setData(response.data);
        setIsLoading(false);
      })
      .catch(function (error) {
        console.error(error.response);
        setIsLoading(false);
      });
  }

  const showToast = () => {
    toast({
      title: "Announcement",
      description: "Our search algorithm is still under development",
      action: <ToastAction altText="Okay">Okay</ToastAction>,
    });
  };

  const removeSubmisison = async (subID: string, userid: string) => {
    axios
      .delete(`https://api-resubase.vercel.app/${subID}/${userid}`, {
        headers: {
          "Content-Type": "application/json",
          apikey: process.env.NEXT_PUBLIC_SERVER_CONNECTION_APIKEY,
        },
      })
      .then(async function (response) {
        await getSubmission();
        toast({
          title: response.data.message,
          description:
            "Submission has been deleted for users only and not admins",
          action: <ToastAction altText="Okay">Okay</ToastAction>,
        });
      })
      .catch(function (error) {
        console.error(error.response);
        toast({
          variant: "destructive",
          title: "Forbiden",
          description: error.response.data.error,
          action: <ToastAction altText="Cancel">Cancel</ToastAction>,
        });
      });
  };

  return (
    <>
      <Head>
        <title>Submissions - Resubase</title>
        <meta
          name="description"
          content="Intresting, Loving, Amazing Submisisons on Resubase"
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
        <meta property="og:title" content="Submissions - Resubase" />
        <meta
          property="og:description"
          content="Intresting, Loving, Amazing Submisisons on Resubase"
        />
        <meta
          property="og:image"
          content="https://res.cloudinary.com/derbreilm/image/upload/v1693019282/brave_screenshot_localhost_1_hog6fw.png"
        />

        <meta name="twitter:card" content="summary_large_image" />
        <meta property="twitter:domain" content="resubase.vercel.app" />
        <meta property="twitter:url" content="https://resubase.vercel.app" />
        <meta name="twitter:title" content="Submissions - Resubase" />
        <meta
          name="twitter:description"
          content="Intresting, Loving, Amazing Submisisons on Resubase"
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
      <Header styles={styles} setIsSidebarActive={setIsSidebarActive} />
        <Sidebar
          styles={styles}
          isSidebarActive={isSidebarActive}
          setIsSidebarActive={setIsSidebarActive}
        />
      <div className="p-10">
        <div className="flex items-center justify-center">
          <div className="w-full max-w-lg justify-center relative">
            <svg
              width="20"
              height="20"
              fill="none"
              stroke="#a9aaab"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
              className="absolute top-4 left-5"
            >
              <path d="M11 3a8 8 0 1 0 0 16 8 8 0 1 0 0-16z"></path>
              <path d="m21 21-4.35-4.35"></path>
            </svg>
            <input
              type="text"
              placeholder="Search submisisons"
              onClick={showToast}
              readOnly
              className="w-full max-w-lg p-3 px-[3rem] rounded-full border border-white/10 outline-none bg-border-dark-hue text-white"
            />
          </div>
        </div>
        <div className="mt-20">
          <h1 className="text-4xl font-semibold text-white">Submissions</h1>
        </div>
        <div className="mt-5">
          <div className="flex flex-wrap-reverse items-stretch gap-2">
            {isLoading ? (
              <div className="flex items-center space-x-4">
                <Skeleton className="h-12 w-12 rounded-full bg-border-dark-hue" />
                <div className="space-y-2">
                  <Skeleton className="h-4 w-[250px] bg-darkbg" />
                  <Skeleton className="h-4 w-[200px] bg-darkbg" />
                </div>
              </div>
            ) : (
              <Fragment>
                {data.length > 0 ? (
                  <Fragment>
                    {data.map((item: subDb, index) => {
                      return (
                        <Fragment key={index}>
                          <div className="p-4 bg-guild border border-guildbc transition-colors hover:border-purpleisfriendly cursor-pointer w-full max-w-md rounded-lg flex flex-col gap-4">
                            <div className="w-full h-auto">
                              <Image
                                src={item.image ? item.image : "/vercel.svg"}
                                width={500}
                                height={500}
                                className="w-full h-auto rounded-md"
                                placeholder="blur"
                                blurDataURL="/vercel.svg"
                                alt="Picture of the author"
                              />
                            </div>
                            <div>
                              <h6 className="text-white text-lg">
                                {item.projectName ? item.projectName : "Vercel"}
                              </h6>
                              <span className="text-purple2 text-sm">
                                Created by:{" "}
                                {item.username
                                  ? `@${item.username}`
                                  : "@vercel"}
                              </span>
                              <div className="flex justify-end">
                                <span
                                  onClick={() =>
                                    removeSubmisison(item.subID, item.userid)
                                  }
                                >
                                  <svg
                                    width="20"
                                    height="20"
                                    fill="#EA3F45"
                                    viewBox="0 0 24 24"
                                    xmlns="http://www.w3.org/2000/svg"
                                  >
                                    <path d="M21 6.001h-5v-1.67a2.42 2.42 0 0 0-2.5-2.33h-3A2.42 2.42 0 0 0 8 4.331v1.67H3a1 1 0 0 0 0 2h1v11a3 3 0 0 0 3 3h10a3 3 0 0 0 3-3v-11h1a1 1 0 1 0 0-2Zm-11 10a1 1 0 0 1-2 0v-4a1 1 0 1 1 2 0v4Zm0-11.67c0-.16.21-.33.5-.33h3c.29 0 .5.17.5.33v1.67h-4v-1.67Zm6 11.67a1 1 0 0 1-2 0v-4a1 1 0 0 1 2 0v4Z"></path>
                                  </svg>
                                </span>
                              </div>
                            </div>
                          </div>
                        </Fragment>
                      );
                    })}
                  </Fragment>
                ) : (
                  <p className="text-white text-lg">No Submissions</p>
                )}
              </Fragment>
            )}
          </div>
        </div>
      </div>
      <Toaster />
    </>
  );
}
