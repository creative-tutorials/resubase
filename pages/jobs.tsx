import Header from "@/components/main/Header";
import Image from "next/image";
import styles from "@/styles/Home.module.css";
import job from "@/styles/job.module.css";
import axios from "axios";
import { Fragment, Suspense, useEffect, useState } from "react";
import Link from "next/link";
import Head from "next/head";
import Sidebar from "@/components/main/Sidebar";
interface Jobs {
  company: string;
  location: string[];
  position: string;
  skills: string[];
  url: string;
}

export default function Job() {
  const [counter, setCounter] = useState(0);
  const [jobs, setJobs] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isSidebarActive, setIsSidebarActive] = useState(false);

  useEffect(() => {
    setCounter((prev) => prev + 1);

    counter === 1 && fetchJobs();

    return () => {
      setCounter(0);
    };
  }, [counter]);

  const fetchJobs = async () => {
    setIsLoading(true);
    axios
      .get("http://localhost:8080/jobs", {
        headers: {
          "Content-Type": "application/json",
          apikey: process.env.NEXT_PUBLIC_SERVER_CONNECTION_APIKEY,
        },
      })
      .then(function (response) {
        setIsLoading(false);
        const data = response.data;
        setJobs(data);
      })
      .catch(function (error) {
        console.error(error.response);
        setIsLoading(false);
      });
  };

  return (
    <>
      <Head>
        <title>Jobs on Resubase</title>
        <meta name="description" content="Search Jobs, and find the one that fits your skills" />
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
        <meta property="og:title" content="Jobs on Resubase" />
        <meta property="og:description" content="Search Jobs, and find the one that fits your skills" />
        <meta
          property="og:image"
          content="https://res.cloudinary.com/derbreilm/image/upload/v1693019282/brave_screenshot_localhost_1_hog6fw.png"
        />

        <meta name="twitter:card" content="summary_large_image" />
        <meta property="twitter:domain" content="resubase.vercel.app" />
        <meta property="twitter:url" content="https://resubase.vercel.app" />
        <meta name="twitter:title" content="Jobs on Resubase" />
        <meta name="twitter:description" content="Search Jobs, and find the one that fits your skills" />
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
      <main className={styles.main}>
        <Header styles={styles} setIsSidebarActive={setIsSidebarActive} />
        <Sidebar
          styles={styles}
          isSidebarActive={isSidebarActive}
          setIsSidebarActive={setIsSidebarActive}
        />
        <div className={job.center}>
          {isLoading ? (
            <div className="border border-border-dark-hue shadow rounded-md p-4 max-w-sm w-full mx-auto">
              <div className="animate-pulse flex space-x-4">
                <div className="rounded-full bg-border-dark-hue h-10 w-10"></div>
                <div className="flex-1 space-y-6 py-1">
                  <div className="h-2 bg-border-dark-hue rounded"></div>
                  <div className="space-y-3">
                    <div className="grid grid-cols-3 gap-4">
                      <div className="h-2 bg-border-dark-hue rounded col-span-2"></div>
                      <div className="h-2 bg-border-dark-hue rounded col-span-1"></div>
                    </div>
                    <div className="h-2 bg-border-dark-hue rounded"></div>
                  </div>
                </div>
              </div>
            </div>
          ) : (
            <div className={job.jobWrapper}>
              {jobs.map((item: Jobs, index) => {
                return (
                  <Fragment key={index}>
                    <div className={job.jobs}>
                      <div className={job.jobProfile}>
                        <div className={job.profileDescription}>
                          <h5
                            id={job.jobOffice}
                            className="text-[16px] font-semibold text-light-purple lg:text-4xl"
                          >
                            {item.position}
                          </h5>
                          <h3
                            id={job.jobRole}
                            className="text-sm font-medium text-light-purple mt-2 lg:text-xl"
                          >
                            {item.company}
                          </h3>
                        </div>
                      </div>
                      <div className={job.bottom}>
                        <div className={job.extra}>
                          {item.location.map((item, index) => {
                            return (
                              <Fragment key={index}>
                                <div
                                  id={job.jobLocation}
                                  className="p-2 w-[100%] max-w-[100px] flex items-center justify-center rounded-[10px] text-purple transition-all duration-75 ease-linear cursor-pointer"
                                >
                                  {item}
                                </div>
                              </Fragment>
                            );
                          })}
                        </div>
                        <div
                          className={
                            "mt-3 flex items-center gap-4 w-[100%] flex-wrap"
                          }
                        >
                          {item.skills.map((item, index) => {
                            return (
                              <Fragment key={index}>
                                <div
                                  id={job.skillTxe}
                                  className="flex items-center justify-center p-2 border border-dashed text-purple border-purple rounded"
                                >
                                  {item}
                                </div>
                              </Fragment>
                            );
                          })}
                        </div>
                      </div>
                      <div className={"flex justify-end"}>
                        {/* <button id={job.apply}>Apply Now</button> */}
                        <Link
                          href={item.url}
                          target="_blank"
                          className="p-[10px] pl-[20px] pr-[20px] border border-purple text-purple flex items-center justify-center rounded-[5px] hover:bg-[#7248fc12]"
                        >
                          Apply Now
                        </Link>
                      </div>
                    </div>
                  </Fragment>
                );
              })}
            </div>
          )}
        </div>
      </main>
    </>
  );
}
