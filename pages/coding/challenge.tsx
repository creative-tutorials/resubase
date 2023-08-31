import Head from "next/head";
import proj from "@/styles/projects.module.css";
import Image from "next/image";
import Link from "next/link";
import styles from "@/styles/Home.module.css";
import Header from "@/components/main/Header";
import AdsShwcase from "@/components/showroom/ads";
import { Fragment, Suspense, Key, useEffect, useState } from "react";
import Sidebar from "@/components/main/Sidebar";
import axios from "axios";
import { useUser } from "@clerk/nextjs";
import { createClient } from "@supabase/supabase-js";
import { Skeleton } from "@/components/ui/skeleton";
import { ToastAction } from "@/components/ui/toast";
import { useToast } from "@/components/ui/use-toast";
import { Toaster } from "@/components/ui/toaster";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

import { error } from "../json/error";

type dataType = {
  projectName: string;
  dueDate: string;
  hasSubscription: string;
  thumbnailURL: string;
};

type dataID = dataType & {
  id: string;
};

type typeForm = {
  projectName: string; // The user's project name
  url: string; // URL of the user's project. e.g. GitHub
  image: string; // URl from storageBucket
};

type SupaEnv = {
  supabaseURL: string;
  anon: string;
};

const dbSupa: SupaEnv = {
  supabaseURL: process.env.NEXT_PUBLIC_SUPABASE_URL as string,
  anon: process.env.NEXT_PUBLIC_SUPABASE_PUBLIC_ANON_KEY as string,
};

const supabase = createClient(dbSupa.supabaseURL, dbSupa.anon);

type appEv = {
  isLoading: boolean;
  isUploading: boolean;
  isSubmiting: boolean;
};

export default function DailyChallenge() {
  const { toast } = useToast();
  const { isSignedIn, user } = useUser();
  const [isSidebarActive, setIsSidebarActive] = useState(false);
  const [previewURL, setPreviewURL] = useState("");
  const [counter, setCounter] = useState(0);
  const [data, setData] = useState([]);
  // const [isLoading, setIsLoading] = useState(false);
  // const [isUploading, setIsUploading] = useState(false);
  // const [isSubmiting, setIsSubmiting] = useState(false);
  const [appState, setAppState] = useState<appEv>({
    isLoading: false,
    isUploading: false,
    isSubmiting: false,
  });
  const [form, setForm] = useState<typeForm>({
    projectName: "",
    url: "",
    image: "",
  });

  const fetchChallenge = async () => {
    setAppState((prev) => {
      return {
        ...prev,
        isLoading: true,
      };
    });
    axios
      .get("http://localhost:8080/challenge", {
        headers: {
          "Content-Type": "application/json",
          apikey: process.env.NEXT_PUBLIC_SERVER_CONNECTION_APIKEY,
        },
      })
      .then(function (response) {
        setData(response.data);
        setAppState((prev) => {
          return {
            ...prev,
            isLoading: false,
          };
        });
      })
      .catch(function (error) {
        console.error(error.response);
        setAppState((prev) => {
          return {
            ...prev,
            isLoading: false,
          };
        });
        toast({
          variant: "destructive",
          title: error.response.data.error,
          description: "Something's not right!",
          action: <ToastAction altText="Okay">Okay</ToastAction>,
        });
      });
  };

  const processSubmission = async () => {
    if (!isSignedIn) {
      toast({
        variant: "destructive",
        title: error.cause,
        description: error.message,
        action: <ToastAction altText="Okay">Okay</ToastAction>,
      });
    }
    setAppState((prev) => {
      return {
        ...prev,
        isSubmiting: true,
      };
    });
    const userProp = user;
    if (userProp?.username === null || undefined) {
      toast({
        variant: "destructive",
        title: "Invalid username",
        description: "We ask that you set a username before continuing",
        action: <ToastAction altText="Okay">Okay</ToastAction>,
      });
    }
    axios
      .post(
        `http://localhost:8080/submission/${userProp?.id}`,
        {
          projectName: form.projectName,
          url: form.url,
          image: form.image,
          username: userProp?.username,
        },
        {
          headers: {
            "Content-Type": "application/json",
            apikey: process.env.NEXT_PUBLIC_SERVER_CONNECTION_APIKEY,
          },
        }
      )
      .then(function (response) {
        setAppState((prev) => {
          return {
            ...prev,
            isSubmiting: false,
          };
        });
        toast({
          title: response.data?.message,
          description: "Your submisison was published and it's under review",
          action: <ToastAction altText="Okay">Okay</ToastAction>,
        });
      })
      .catch(function (error) {
        console.error(error);
        setAppState((prev) => {
          return {
            ...prev,
            isSubmiting: false,
          };
        });
        toast({
          variant: "destructive",
          title: error.response.data.error,
          description: "Something's not right!",
          action: <ToastAction altText="Cancel">Cancel</ToastAction>,
        });
      });
  };

  const uploadImage = async (event: any) => {
    setAppState((prev) => {
      return {
        ...prev,
        isUploading: true,
      };
    });
    const file = event.target.files[0];
    const fileName: string = file.name;

    if (!file) {
      console.log("No file selected");
      setAppState((prev) => {
        return {
          ...prev,
          isUploading: false,
        };
      });
      return;
    }

    const { data, error } = await supabase.storage
      .from("images")
      .upload(`submissions/${fileName}`, file, {
        cacheControl: "3600",
        upsert: true,
      });

    if (error) {
      console.error(error);
      toast({
        variant: "destructive",
        title: error.name,
        description: error.message,
        action: <ToastAction altText="Cancel">Cancel</ToastAction>,
      });
      setAppState((prev) => {
        return {
          ...prev,
          isUploading: false,
        };
      });
    }
    await getPublicURL(fileName, event)
      .then(function () {})
      .catch(function (error) {
        console.error(error);
        toast({
          variant: "destructive",
          title: "Upload failed",
          description: "Assets failed to upload",
          action: <ToastAction altText="Cancel">Cancel</ToastAction>,
        });
      });
  };

  async function getPublicURL(
    fileName: string,
    event: { target: { value: string } }
  ) {
    const { data } = supabase.storage
      .from("images")
      .getPublicUrl(`submissions/${fileName}`);

    setForm((prev) => {
      return {
        ...prev,
        image: data.publicUrl,
      };
    });
    toast({
      title: "Upload sucessfully",
      description: "Assets upload sucessfully",
      action: <ToastAction altText="Okay">Okay</ToastAction>,
    });
    event.target.value = "";
    setAppState((prev) => {
      return {
        ...prev,
        isUploading: false,
      };
    });
  }

  useEffect(() => {
    setCounter((prev) => prev + 1);
    counter === 1 && fetchChallenge();

    return () => {
      setCounter(0);
    };
  }, [counter]);

  return (
    <>
      <Head>
        <title>Coding Challenge - Resubase</title>
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
        <meta property="og:title" content="Coding Challenge - Resubase" />
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
        <meta name="twitter:title" content="Coding Challenge - Resubase" />
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
      <main id={proj.main}>
        <Header styles={styles} setIsSidebarActive={setIsSidebarActive} />
        <Sidebar
          styles={styles}
          isSidebarActive={isSidebarActive}
          setIsSidebarActive={setIsSidebarActive}
        />
        <div className="w-[100%] flex flex-col gap-5 items-center justify-between bg-guild border-b border-guildbc p-4 pl-4 md:p-5 md:pl-10 lg:p-5 lg:pl-10 md:flex-row lg:flex-row md:gap-0 lg:gap-0">
          <div>
            <h1 className="text-3xl font-bold text-white">Coding Challenges</h1>
            <p className="text-white text-sm">
              Get projects to practice on to level up that developer skills
            </p>
          </div>
          <div>
            <Popover>
              <PopoverTrigger asChild>
                <Link
                  href="/app"
                  className="flex items-center p-3 pl-4 pr-4 gap-2 bg-purple hover:bg-primepurple text-white font-semibold rounded-md shadow-md transition-all"
                >
                  <svg
                    width="20"
                    height="20"
                    fill="#ffffff"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path d="M11.28 4.92a.6.6 0 0 1 .6-.6h8.4a.6.6 0 0 1 .6.6v1.2a.6.6 0 0 1-.6.6h-8.4a.6.6 0 0 1-.6-.6v-1.2Zm-6-1.8a2.4 2.4 0 0 0-2.4 2.4v2.4a2.4 2.4 0 0 0 2.4 2.4h2.4a2.4 2.4 0 0 0 2.4-2.4v-2.4a2.4 2.4 0 0 0-2.4-2.4h-2.4Zm0 9.6a2.4 2.4 0 0 0-2.4 2.4v2.4a2.4 2.4 0 0 0 2.4 2.4h2.4a2.4 2.4 0 0 0 2.4-2.4v-2.4a2.4 2.4 0 0 0-2.4-2.4h-2.4Zm1.025-4.375a.6.6 0 0 1-.85 0l-1.2-1.2a.6.6 0 0 1 .85-.85l.775.777 1.975-1.977a.6.6 0 0 1 .85.85l-2.4 2.4Zm0 9.6a.6.6 0 0 1-.85 0l-1.2-1.2a.6.6 0 1 1 .85-.85l.775.777 1.975-1.977a.6.6 0 1 1 .85.85l-2.4 2.4Zm4.975-3.425a.6.6 0 0 1 .6-.6h8.4a.6.6 0 0 1 .6.6v1.2a.6.6 0 0 1-.6.6h-8.4a.6.6 0 0 1-.6-.6v-1.2Zm0-6a.6.6 0 0 1 .6-.6h6a.6.6 0 1 1 0 1.2h-6a.6.6 0 0 1-.6-.6Zm0 9.6a.6.6 0 0 1 .6-.6h6a.6.6 0 1 1 0 1.2h-6a.6.6 0 0 1-.6-.6Z"></path>
                  </svg>
                  Submit
                </Link>
              </PopoverTrigger>
              <PopoverContent className="w-80 bg-dark_nitro border-none">
                <div className="grid gap-4">
                  <div className="space-y-2">
                    <h4 className="font-medium leading-none text-white">
                      Submit Project
                    </h4>
                    <p className="text-sm text-white">
                      Submit the completed challenge.
                    </p>
                  </div>
                  <div className="grid gap-2">
                    <div className="grid grid-cols-3 items-center gap-4">
                      <Label htmlFor="name" className="text-white/70">
                        projectName
                      </Label>
                      <Input
                        id="name"
                        defaultValue="resubase"
                        onChange={(e) =>
                          setForm({ ...form, projectName: e.target.value })
                        }
                        autoComplete="off"
                        className="col-span-2 h-8 border border-white/20 text-white"
                      />
                    </div>
                    <div className="grid grid-cols-3 items-center gap-4">
                      <Label htmlFor="url" className="text-white/70">
                        SandboxURL
                      </Label>
                      <Input
                        id="url"
                        defaultValue={"https://resubase.vercel.app"}
                        onChange={(e) =>
                          setForm({ ...form, url: e.target.value })
                        }
                        autoComplete="off"
                        className="col-span-2 h-8 border border-white/20 text-white"
                      />
                    </div>
                    <div className="mt-3">
                      <input
                        type="file"
                        name="s3 bucket"
                        id="s3"
                        accept="image/png, image/jpg, image/jpeg, image/avif"
                        hidden
                        onChange={uploadImage}
                      />
                      {appState.isUploading ? (
                        <Badge className="bg-purple/20 border border-purple2/20 font-semibold text-white">
                          Uploading
                        </Badge>
                      ) : (
                        <Label
                          htmlFor="s3"
                          className="p-[0.7rem] px-4 rounded-md cursor-pointer bg-transparent border border-purple text-white transition-colors hover:bg-primepurple hover:border-transparent"
                        >
                          Upload Image
                        </Label>
                      )}
                      {/* {isUploading && (
                        <Badge className="bg-purple/20 border border-purple2/20 font-semibold text-white">
                          Uploading
                        </Badge>
                      )} */}
                    </div>
                    <div className="mt-4">
                      <Button
                        className={`${
                          appState.isSubmiting
                            ? "bg-purple/20 pointer-events-none text-white"
                            : "bg-purple text-white hover:bg-primepurple transition-colors"
                        }`}
                        onClick={processSubmission}
                      >
                        {appState.isSubmiting ? "Please wait..." : "Done"}
                      </Button>
                    </div>
                  </div>
                </div>
              </PopoverContent>
            </Popover>
          </div>
        </div>
        <div className="p-4 w-[100%] md:p-10 lg:p-10">
          <p className="font-medium text-white">
            Pick your favorite challenge to work on
          </p>

          <div className="flex items-center gap-3 flex-wrap mt-4">
            <AdsShwcase setPreviewURL={setPreviewURL} />
            {appState.isLoading ? (
              <div className="flex items-center space-x-4">
                <Skeleton className="h-12 w-12 rounded-full bg-border-dark-hue" />
                <div className="space-y-2">
                  <Skeleton className="h-4 w-[250px] bg-darkbg" />
                  <Skeleton className="h-4 w-[200px] bg-darkbg" />
                </div>
              </div>
            ) : (
              <>
                {data.length > 0 && (
                  <Fragment>
                    {data.map((item: dataID, index) => {
                      return (
                        <Fragment key={index}>
                          <div className="p-4 w-[100%] max-w-md bg-guild border border-guildbc flex flex-col items-center text-center rounded-lg gap-2 cursor-pointer select-none">
                            <div className="">
                              <h3 className="text-white">
                                {item.projectName ? item.projectName : "Vercel"}
                              </h3>
                            </div>
                            <div className="w-[100%] h-[100%] rounded-lg overflow-hidden relative">
                              {item.hasSubscription === "free" && (
                                <Image
                                  className="w-[100%] h-[300px] object-cover rounded-lg overflow-hidden hover:scale-110 transition-all"
                                  src={
                                    item.thumbnailURL
                                      ? item.thumbnailURL
                                      : "/vercel.svg"
                                  }
                                  width={500}
                                  height={500}
                                  onClick={() =>
                                    setPreviewURL(
                                      item.thumbnailURL
                                        ? item.thumbnailURL
                                        : "/vercel.svg"
                                    )
                                  }
                                  alt={`Thumbail showcasing ${item.projectName}`}
                                />
                              )}
                              {item.hasSubscription === "paid" && (
                                <Image
                                  className="w-[100%] h-[300px] object-cover rounded-lg overflow-hidden hover:scale-110 transition-all"
                                  src={process.env.NEXT_PUBLIC_PRO as string}
                                  width={500}
                                  height={500}
                                  onClick={() =>
                                    setPreviewURL(
                                      process.env.NEXT_PUBLIC_PRO as string
                                    )
                                  }
                                  alt={`Pro Image showcasing ${item.projectName}`}
                                />
                              )}
                              {item.hasSubscription === "paid" && (
                                <div className="absolute w-[100%] h-[100%] bottom-0 p-2 bg-purple/20 flex items-center justify-center backdrop-blur-md">
                                  <span className="text-2xl flex flex-col items-center text-white font-medium">
                                    <svg
                                      width="50"
                                      height="50"
                                      fill="#ffff"
                                      viewBox="0 0 24 24"
                                      xmlns="http://www.w3.org/2000/svg"
                                    >
                                      <path
                                        fillRule="evenodd"
                                        d="m7.306 7.758.343 3.088-.694.055a2.111 2.111 0 0 0-1.915 1.764 20.641 20.641 0 0 0 0 6.67A2.111 2.111 0 0 0 6.955 21.1l1.496.12c2.362.188 4.736.188 7.098 0l1.496-.12a2.111 2.111 0 0 0 1.916-1.764 20.64 20.64 0 0 0 0-6.67 2.111 2.111 0 0 0-1.916-1.764l-.694-.055.343-3.088a5.01 5.01 0 0 0 0-1.095l-.023-.205a4.7 4.7 0 0 0-9.342 0l-.023.205a4.96 4.96 0 0 0 0 1.095ZM12.374 3.8A3.2 3.2 0 0 0 8.82 6.624l-.023.205a3.46 3.46 0 0 0 0 .764l.349 3.139c1.9-.122 3.807-.122 5.708 0l.349-3.14a3.46 3.46 0 0 0 0-.763l-.023-.205a3.2 3.2 0 0 0-2.806-2.825ZM12 14.5a1.5 1.5 0 1 0 0 3 1.5 1.5 0 0 0 0-3Z"
                                        clipRule="evenodd"
                                      ></path>
                                    </svg>{" "}
                                    Unlock PRO
                                  </span>
                                </div>
                              )}
                            </div>
                            <div className="w-[100%] mt-3">
                              {item.hasSubscription === "paid" && (
                                <Link href={`https://resubase.lemonsqueezy.com/checkout/buy/ab215088-c7ec-4e04-95f3-fefac0cfae57`}>
                                  <button className="w-[100%] p-3 bg-purple text-white font-semibold rounded-md transition-all hover:bg-primepurple">
                                    Start Challenge
                                  </button>
                                </Link>
                              )}
                              {item.hasSubscription === "free" && (
                                <Link href={`/editor/${item.id}`}>
                                  <button className="w-[100%] p-3 bg-purple text-white font-semibold rounded-md transition-all hover:bg-primepurple">
                                    Start Challenge
                                  </button>
                                </Link>
                              )}
                            </div>
                          </div>
                        </Fragment>
                      );
                    })}
                  </Fragment>
                )}
              </>
            )}
          </div>
        </div>
        {previewURL && (
          <div className="w-[100%] h-[100%] p-1 fixed bg-guild top-0 left-0 md:p-20 lg:p-20">
            <div
              className="flex justify-end p-1 cursor-pointer"
              onClick={() => setPreviewURL("")}
            >
              <svg
                width="20"
                height="20"
                fill="none"
                stroke="#ffffff"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path d="m5 5 14 14M5 19 19 5"></path>
              </svg>
            </div>
            <div className="w-[100%] h-[100%] flex items-center justify-center">
              <Image
                className="w-[100%] max-w-[900px] h-[300px] object-fill rounded-lg md:h-full lg:h-full"
                src={previewURL ? previewURL : "/next.svg"}
                width={500}
                height={500}
                priority={true}
                unoptimized
                placeholder="blur"
                blurDataURL="/next.svg"
                alt="Preview of project"
              />
            </div>
          </div>
        )}
      </main>
      <Toaster />
    </>
  );
}
