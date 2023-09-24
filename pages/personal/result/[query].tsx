import Head from "next/head";
import { useRouter } from "next/router";
import { useState, useEffect, useRef, Fragment } from "react";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { Input } from "@/components/ui/input";
import { Skeleton } from "@/components/ui/skeleton";
import { MagnifyingGlassIcon } from "@radix-ui/react-icons";
import { Cross2Icon } from "@radix-ui/react-icons";
import { Link1Icon } from "@radix-ui/react-icons";
import YouTubeIcon from "@/components/icons/youtube";
import LinkedInIcon from "@/components/icons/linkedin";

import axios from "axios";
import Link from "next/link";
import MediumIcon from "@/components/icons/medium";
import GitHubIcon from "@/components/icons/github";
import StackOverflowIcon from "@/components/icons/stackovrflw";
import RedditIcon from "@/components/icons/reddit";
import SkeletonLoader from "@/components/main/Loader";

import { ToastAction } from "@/components/ui/toast";
import { useToast } from "@/components/ui/use-toast";
import { Toaster } from "@/components/ui/toaster";
import UdemyIcon from "@/components/icons/udemy";
import CourseraIcon from "@/components/icons/coursera";
import MozillaIcon from "@/components/icons/mdn";
import RoadmapshIcon from "@/components/icons/roadmapsh";
import ReactdevIcon from "@/components/icons/reactdev";
import NotionIcon from "@/components/icons/notion";
import IndeedIcon from "@/components/icons/indeed";
import CodecademyIcon from "@/components/icons/ccd";
import CodepenIcon from "@/components/icons/codepen";
import JavaScriptIcon from "@/components/icons/js";
import AstroIcon from "@/components/icons/astro";
import NodejsIcon from "@/components/icons/node";

type stateQuery = string | string[];
type errType = string;

type data = {
  keyword: string;
  title: string;
  url: string;
  host: string;
  description: string;
};

export default function Result() {
  const router = useRouter();
  const { toast } = useToast();
  const inputElement = useRef<HTMLInputElement | null>(null);
  const { query } = router.query;
  const [resQuery, setResQuery] = useState<stateQuery>("");
  const [errMsg, setErrMsg] = useState<errType>("");
  const [counter, setCounter] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const [data, setData] = useState([]);

  useEffect(() => {
    setCounter((prev) => prev + 1);
    if (counter >= 1 && query) {
      fetchResults(query);
      setResQuery(query)
      if (inputElement.current !== null) {
        inputElement.current.value = query;
      }
    }

    return () => {
      setCounter(0);
    };
  }, [counter, query]);

  async function fetchResults(query: string | string[]) {
    setIsLoading(true);
    axios
      .get(`http://localhost:8080/search/${query}`, {
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
        setErrMsg(error.response.data.error);
        setData([]);
        setIsLoading(false);
      });
  }

  const updateSearchKeyword = (event: { target: { value: any } }) => {
    const { value } = event.target;
    if (value !== "" || value !== undefined || value !== null) {
      setResQuery(value);
    }
  };
  const handleEnterKeyPress = (event: { key: string }) => {
    if (event.key === "Enter") {
      if (resQuery === "") {
        return;
      } else {
        router.push(`/personal/result/${resQuery}`);
      }
    }
  };

  const copyLink = (url: string) => {
    navigator.clipboard
      .writeText(url)
      .then(function (response) {
        toast({
          title: "Link copied sucessfully",
          action: <ToastAction altText="Okay">Okay</ToastAction>,
        });
      })
      .catch(function (error) {
        console.error("Failed to copy: ", error);
      });
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
      <div className="w-full p-3 md:p-10 lg:p-10">
        <div className="w-full bg-sidebar-link-bg fixed left-0 top-0 p-3 md:p-10 lg:p-10">
          <MagnifyingGlassIcon className="w-5 h-5 text-light-purple absolute left-4 top-7 md:top-14 lg:top-14 md:left-12 lg:left-12" />
          <Input
            type="text"
            placeholder="Search anything"
            className="border border-metal/20 text-light-purple p-6 px-8"
            onChange={updateSearchKeyword}
            onKeyUp={handleEnterKeyPress}
            ref={inputElement}
            value={resQuery}
          />
          <Cross2Icon className="w-5 h-5 text-light-purple absolute cursor-pointer right-4 top-7 md:top-14 lg:top-14 md:right-12 lg:right-12" onClick={() => setResQuery("")} />
        </div>
        <div className="mt-32">
          <div className="flex flex-col gap-10 scroll-smooth">
            {isLoading ? (
              <SkeletonLoader />
            ) : (
              <Fragment>
                {data.length > 0 ? (
                  <Fragment>
                    {data.map((item: data, index) => {
                      return (
                        <Fragment key={index}>
                          <div className="flex items-baseline justify-between gap-2 p-3 rounded-md bg-transparent transition-all hover:bg-border-dark-hue cursor-pointer">
                            <div className="flex items-baseline gap-2">
                              {item.host === "linkedin" && <LinkedInIcon />}
                              {item.host === "youtube" && <YouTubeIcon />}
                              {item.host === "medium" && <MediumIcon />}
                              {item.host === "github" && <GitHubIcon />}
                              {item.host === "notion" && <NotionIcon />}
                              {item.host === "javascript.com" && (
                                <JavaScriptIcon />
                              )}
                              {item.host === "stackoverflow" && (
                                <StackOverflowIcon />
                              )}
                              {item.host === "udemy" && <UdemyIcon />}
                              {item.host === "reddit" && <RedditIcon />}
                              {item.host === "coursera" && <CourseraIcon />}
                              {item.host === "mdn web docs" && <MozillaIcon />}
                              {item.host === "roadmap.sh" && <RoadmapshIcon />}
                              {item.host === "nodejs.org" && <NodejsIcon />}
                              {item.host === "react.dev" && <ReactdevIcon />}
                              {item.host === "astro.build" && <AstroIcon />}
                              {item.host === "indeed" && <IndeedIcon />}
                              {item.host === "codecademy" && <CodecademyIcon />}
                              {item.host === "codepen" && <CodepenIcon />}
                              <div className="">
                                <h3 className="text-white hover:underline text-sm md:text-base lg:text-base">
                                  {" "}
                                  <Link href={item.url}>{item.title}</Link>
                                </h3>
                                <span className="text-xs text-light-purple md:text-sm lg:text-sm">
                                  {item.description}
                                </span>
                              </div>
                            </div>
                            <div className="">
                              <TooltipProvider>
                                <Tooltip>
                                  <TooltipTrigger asChild>
                                    <Link1Icon
                                      className="text-light-purple cursor-pointer w-4 h-4"
                                      onClick={() => copyLink(item.url)}
                                    />
                                  </TooltipTrigger>
                                  <TooltipContent className="bg-border-dark-hue text-light-purple">
                                    <p>Copy link</p>
                                  </TooltipContent>
                                </Tooltip>
                              </TooltipProvider>
                            </div>
                          </div>
                        </Fragment>
                      );
                    })}
                  </Fragment>
                ) : (
                  <p className="text-light-purple">{errMsg || "not found"}</p>
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
