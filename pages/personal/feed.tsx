import { useRouter } from "next/router";
import { useState, useEffect, Fragment, ChangeEvent } from "react";
import Head from "next/head";
import Image from "next/image";
import Link from "next/link";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Skeleton } from "@/components/ui/skeleton";
import { useTheme } from "next-themes";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import {
  ExternalLinkIcon,
  MagnifyingGlassIcon,
  MoonIcon,
  SunIcon,
} from "@radix-ui/react-icons";
import { UserButton } from "@clerk/nextjs";
import axios from "axios";

type feedType = {
  keyid: string;
  date: string;
  keyword: string;
  title: string;
  url: string;
  imageURL: string;
};

type errState = {
  isError: boolean;
  errorMessage: string;
};

type deployState = boolean;

export default function Feed() {
  const router = useRouter();
  const [search, setSearch] = useState("");
  const [counter, setCounter] = useState(0);
  const [isRendering, setIsRendering] = useState(false);
  const [feedArray, setFeedArray] = useState([]);
  const [errorState, setErrorState] = useState<errState>({
    isError: false,
    errorMessage: "",
  });

  const [isProd, setIsProd] = useState<deployState>(true);
  const { setTheme } = useTheme()
  useEffect(() => {
    setCounter((prev) => prev + 1);
    counter === 1 && fetchFeed();

    async function fetchFeed() {
      setIsRendering(true);
      axios
        .get(
          `${
            isProd
              ? "https://api-resubase.vercel.app/feed"
              : "http://localhost:8080/feed"
          }`,
          {
            headers: {
              "Content-Type": "application/json",
              apikey: process.env.NEXT_PUBLIC_SERVER_CONNECTION_APIKEY,
            },
          }
        )
        .then(function (response) {
          setFeedArray(response.data);
          setIsRendering(false);
          setErrorState((prev) => {
            return {
              ...prev,
              isError: false,
              errorMessage: "",
            };
          });
        })
        .catch(function (error) {
          console.error(error.response);
          setIsRendering(false);
          setErrorState((prev) => {
            return {
              ...prev,
              isError: true,
              errorMessage: error.response.data.error,
            };
          });
        });
    }
    return () => {
      setCounter(0);
    };
  }, [counter, isProd]);

  const handleInputChange = async (event: ChangeEvent<HTMLInputElement>) => {
    // const { value } = event.target;
    const value = event.target.value.toLowerCase();
    setSearch(value);
  };

  const updateData = async () => {
    if (search !== "" || search !== undefined || search !== null) {
      setIsRendering(true);
      axios
        .get(
          `${
            isProd
              ? `https://api-resubase.vercel.app/feed/${search}`
              : `http://localhost:8080/feed/${search}`
          }`,
          {
            headers: {
              "Content-Type": "application/json",
              apikey: process.env.NEXT_PUBLIC_SERVER_CONNECTION_APIKEY,
            },
          }
        )
        .then(function (response) {
          setFeedArray(response.data);
          setIsRendering(false);
          setErrorState((prev) => {
            return {
              ...prev,
              isError: false,
              errorMessage: "",
            };
          });
        })
        .catch(function (error) {
          console.error(error.response);
          setFeedArray([]);
          setIsRendering(false);
          setErrorState((prev) => {
            return {
              ...prev,
              isError: true,
              errorMessage: error.response.data.error,
            };
          });
        });
    } else {
      console.error("invalid input");
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
      <header className="w-full bg-lightbg dark:bg-sidebar-link-bg fixed top-0 left-0 z-10 border border-transparent dark:border-b-card_border_color border-b-lightborder p-4 px-11 flex items-center justify-between">
        <div className="">
          <Link href="#">
            <span className="text-guild dark:text-white">Resubase</span>
          </Link>
        </div>
        <nav className="flex items-center gap-4">
          <UserButton />
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant={"default"} className="dark:bg-darkbg hover:dark:bg-darkbg/70 bg-buttonlight hover:bg-buttonlight/70" size="icon">
                <SunIcon className="h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all text-guild dark:text-white dark:-rotate-90 dark:scale-0" />
                <MoonIcon className="absolute h-[1.2rem] w-[1.2rem] rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
                <span className="sr-only">Toggle theme</span>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="border dark:border-card_border_color dark:bg-guild border-lightborder bg-realwhite" align="end">
              <DropdownMenuItem className="dark:hover:bg-search-button-bg" onClick={() => setTheme("light")}>
                Light
              </DropdownMenuItem>
              <DropdownMenuItem className="dark:hover:bg-search-button-bg" onClick={() => setTheme("dark")}>
                Dark
              </DropdownMenuItem>
              <DropdownMenuItem className="dark:hover:bg-search-button-bg" onClick={() => setTheme("system")}>
                System
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </nav>
      </header>
      <div className="p-4 md:p-10 lg:p-10 mt-20">
        <div className="">
          <Dialog>
            <DialogTrigger asChild>
              <Button className="dark:bg-transparent bg-buttonlight dark:text-search-button-tc text-guild font-semibold text-base flex items-center gap-1 transition-all hover:dark:bg-search-button-bg hover:dark:text-white hover:bg-buttonlight/60 hover:text-guild">
                Search <MagnifyingGlassIcon width={20} height={20} />
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px] border border-transparent dark:bg-search-button-bg bg-white">
              <div className="grid gap-4 py-4">
                <div className="w-full">
                  <Input
                    id="name"
                    placeholder="Search post"
                    onChange={handleInputChange}
                    value={search}
                    autoComplete="off"
                    // defaultValue="React router v6 documentation"
                    className="w-full border dark:border-card_border_color_hover border-lightborder dark:text-white text-guild"
                  />
                </div>
              </div>
              <DialogFooter>
                <Button
                  className={`${
                    isRendering
                      ? "text-white pointer-events-none dark:bg-card_border_color/30 bg-royalblue/30"
                      : "text-white dark:bg-card_border_color bg-royalblue hover:dark:bg-card_border_color_hover hover:bg-royalblue-dark-momentum"
                  }`}
                  onClick={updateData}
                >
                  {isRendering ? "Please wait..." : "Search"}
                </Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </div>
        <div className="mt-8 flex flex-wrap gap-6 scroll-smooth">
          {isRendering ? (
            <div className="flex items-center space-x-4">
              <Skeleton className="h-12 w-12 rounded-full bg-card_border_color" />
              <div className="space-y-2">
                <Skeleton className="h-4 w-[250px] bg-card_border_color" />
                <Skeleton className="h-4 w-[200px] bg-card_border_color" />
              </div>
            </div>
          ) : (
            <Fragment>
              {feedArray.map((item: feedType, index) => {
                return (
                  <Fragment key={item.keyid}>
                    <div className="w-full select-none max-w-md dark:bg-card_background dark:shadow-none bg-realwhite shadow-md cursor-pointer border dark:border-card_border_color border-lightborder transition-all hover:dark:border-card_border_color_hover hover:border-search-button-tc p-4 rounded-xl">
                      <div className="flex flex-col gap-4">
                        <div className="flex justify-end">
                          <Link href={item.url} target="_blank">
                            <Button className="dark:bg-white bg-guild dark:text-guild text-realwhite hover:dark:bg-white/70 hover:bg-guild/70 flex gap-1">
                              Open <ExternalLinkIcon />
                            </Button>
                          </Link>
                        </div>
                        <div className="flex flex-col gap-4">
                          <h3 className="dark:text-white text-guild font-semibold text-xl">
                            {item.title}
                          </h3>
                          <span className="dark:text-light-purple text-card_border_color text-sm">
                            {item.date}
                          </span>
                        </div>
                        <div className="">
                          <Image
                            src={item.imageURL}
                            width={500}
                            height={500}
                            className="rounded"
                            placeholder="blur"
                            blurDataURL="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mP8Xw8AAoMBgDTD2qgAAAAASUVORK5CYII="
                            alt="Picture of the author"
                          />
                        </div>
                      </div>
                    </div>
                  </Fragment>
                );
              })}
            </Fragment>
          )}
        </div>
        {errorState.isError && (
          <div className="mt-8 flex items-center text-center justify-center">
            <div className="flex flex-col items-center justify-center text-center">
              <MagnifyingGlassIcon className="w-12 h-12 text-search-button-tc" />
              <p className="text-white text-lg md:text-2xl lg:md:text-2xl">
                No result found
              </p>
              <span className="text-search-button-tc text-sm md:text-base lg:text-base">
                {errorState.errorMessage}
              </span>
            </div>
          </div>
        )}
      </div>
    </>
  );
}
