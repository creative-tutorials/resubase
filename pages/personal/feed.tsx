import { useRouter } from "next/router";
import { useState, useEffect, Fragment } from "react";
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
import { ExternalLinkIcon, MagnifyingGlassIcon } from "@radix-ui/react-icons";
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

type deployState = boolean;

export default function Feed() {
  const router = useRouter();
  const [search, setSearch] = useState("");
  const [counter, setCounter] = useState(0);
  const [isRendering, setIsRendering] = useState(false);
  const [feedArray, setFeedArray] = useState([]);

  const [isProd, setIsProd] = useState<deployState>(true);
  useEffect(() => {
    setCounter((prev) => prev + 1);
    counter === 1 && fetchFeed();

    async function fetchFeed() {
      setIsRendering(true);
      axios
        .get(`${isProd ? 'https://api-resubase.vercel.app/feed' : 'http://localhost:8080/feed'}`, {
          headers: {
            "Content-Type": "application/json",
            apikey: process.env.NEXT_PUBLIC_SERVER_CONNECTION_APIKEY,
          },
        })
        .then(function (response) {
          console.log(response.data);
          setFeedArray(response.data);
          setIsRendering(false);
        })
        .catch(function (error) {
          console.error(error.response);
          setIsRendering(false);
        });
    }
    return () => {
      setCounter(0);
    };
  }, [counter, isProd]);



  const handleSearchRequest = async (event: { target: { value: any } }) => {
    const { value } = event.target;
    if (value !== "" || value !== undefined || value !== null) {
      setSearch(value);
    }
  };

  const handleEnterKeyPress = (event: { key: string }) => {
    if (event.key === "Enter") {
      if (search === "") {
        return;
      } else {
        router.push(`/personal/result/${search}`);
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
      <header className="w-full bg-sidebar-link-bg fixed top-0 left-0 z-10 border border-b-card_border_color p-4 px-11 flex items-center justify-between">
        <div className="">
          <Link href="/">
            <span className="text-white">Resubase</span>
          </Link>
        </div>
        <nav>
          <UserButton />
        </nav>
      </header>
      <div className="p-4 md:p-10 lg:p-10 mt-20">
        <div className="">
          <Dialog>
            <DialogTrigger asChild>
              <Button className="bg-transparent text-search-button-tc font-semibold text-base flex items-center gap-1 transition-all hover:bg-search-button-bg hover:text-white">
                Search <MagnifyingGlassIcon width={20} height={20} />
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px] border border-transparent bg-search-button-bg">
              <div className="grid gap-4 py-4">
                <div className="w-full">
                  <Input
                    id="name"
                    placeholder="Search post"
                    autoComplete="off"
                    // defaultValue="React router v6 documentation"
                    className="w-full border border-card_border_color_hover text-white"
                  />
                </div>
              </div>
              <DialogFooter>
                <Button className="text-white bg-card_border_color hover:bg-card_border_color_hover">
                  Search
                </Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </div>
        <div className="mt-8 flex flex-wrap gap-6">
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
                    <div className="w-full select-none max-w-md bg-card_background cursor-pointer border border-card_border_color transition-all hover:border-card_border_color_hover p-4 rounded-xl">
                      <div className="flex flex-col gap-4">
                        <div className="flex justify-end">
                          <Link href={item.url} target="_blank">
                            <Button className="bg-white hover:bg-white/70 flex gap-1">
                              Open <ExternalLinkIcon />
                            </Button>
                          </Link>
                        </div>
                        <div className="flex flex-col gap-4">
                          <h3 className="text-white font-semibold text-xl">
                            {item.title}
                          </h3>
                          <span className="text-light-purple text-sm">
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
                            blurDataURL="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mP8z8BQDwAEhQGAhKmMIQAAAABJRU5ErkJggg=="
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
      </div>
    </>
  );
}
