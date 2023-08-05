import Header from "@/components/main/Header";
import Image from "next/image";
import styles from "@/styles/Home.module.css";
import job from "@/styles/job.module.css";
import axios from "axios";
import { Fragment, useEffect, useState } from "react";
import Link from "next/link";
import Head from "next/head";

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
      .get("https://api-resubase.vercel.app/jobs")
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
        <title>Jobs/Resubase</title>
        <meta name="description" content="Find Jobs that matches your skills" />
        <meta
          name="google-site-verification"
          content="l1a2fyP4jz21WqSIR2HNxLAyt__hUNkV-48f_zbVHYE"
        />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta
          name="twitter:card"
          content="Find Jobs that matches your skills"
        />
        <meta name="twitter:site" content="Resubase" />
        <meta name="twitter:creator" content="@timi" />
        <meta property="og:title" content="Jobs/Resubase" />
        <meta property="og:url" content="resubase.vercel.app" />
        <meta property="og:image" content="/resubase-default.png" />
        <meta property="og:site_name" content="Resubase" />
        <meta property="og:type" content="website" />
        <meta
          property="og:description"
          content="Find Jobs that matches your skills"
        />
        <meta
          property="og:title"
          content="Find Jobs that matches your skills"
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
      <main className={styles.main}>
        <Header styles={styles} />
        <div className={job.center}>
          {isLoading ? (
            <div className={styles.bars_center}>
              <div className={styles.bars}></div>
            </div>
          ) : (
            <div className={job.jobWrapper}>
              {jobs.map((item: Jobs, index) => {
                return (
                  <Fragment key={index}>
                    <div className={job.jobs}>
                      <div className={job.jobProfile}>
                        <div className={job.Image}>
                          <Image
                            src="/office-building.png"
                            width={70}
                            height={70}
                            alt="job profile"
                            style={{ borderRadius: "50%" }}
                          />
                        </div>
                        <div className={job.profileDescription}>
                          <h5 id={job.jobOffice}>{item.company}</h5>
                          <h3 id={job.jobRole}>{item.position}</h3>
                        </div>
                      </div>
                      <div className={job.bottom}>
                        <div className={job.extra}>
                          {item.location.map((item, index) => {
                            return (
                              <Fragment key={index}>
                                <div id={job.jobLocation}>{item}</div>
                              </Fragment>
                            );
                          })}
                        </div>
                        <div className={job.skillsTag}>
                          {item.skills.map((item, index) => {
                            return (
                              <Fragment key={index}>
                                <div id={job.skillTxe}>{item}</div>
                              </Fragment>
                            );
                          })}
                        </div>
                      </div>
                      <div className={job.applyButton}>
                        {/* <button id={job.apply}>Apply Now</button> */}
                        <Link href={item.url} target="_blank" id={job.apply}>
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
