import axios from "axios";
import { useRouter } from "next/router";
import { Fragment, useEffect, useState } from "react";
import answ from "@/styles/answer.module.css";
import Image from "next/image";
import Head from "next/head";

interface CommentProp {
  comment: string;
  date: string;
  imageURL: string;
  interactions: {
    upvotes: number;
    downvotes: number;
  };
  isNew: boolean;
  username: string;
}

export default function Qustion() {
  const router = useRouter();
  const { id } = router.query;
  const [counter, setCounter] = useState(0);
  const [answers, setAnswers] = useState([]);

  useEffect(() => {
    if (!id) {
      return;
    } else {
      console.log("Resubase");
    }
    setCounter((prev) => prev + 1);
    counter === 1 || (id && fetchAnswers(id));

    return () => {
      setCounter(0);
    };
  }, [counter, id]);

  const fetchAnswers = async (id: string | string[]) => {
    axios
      .get(`https://api-resubase.vercel.app/comments/${id}`)
      .then(function (response) {
        setAnswers(response.data);
      })
      .catch(function (error) {
        console.error(error.response);
      });
  };

  return (
    <>
      <Head>
        <title>Answers</title>
        <meta name="description" content="Answer to your question" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link
          rel="apple-touch-icon"
          sizes="180x180"
          href="/app/apple-touch-icon.png"
        />
        <link
          rel="icon"
          type="image/png"
          sizes="32x32"
          href="/app/favicon-32x32.png"
        />
        <link
          rel="icon"
          type="image/png"
          sizes="16x16"
          href="/app/favicon-16x16.png"
        />
        <link rel="manifest" href="/app/site.webmanifest" />
      </Head>
      <main className={answ.main}>
        <div className={answ.longLine}></div>
        {answers.map((item: CommentProp, index) => {
          return (
            <Fragment key={index}>
              <div className={answ.answerBox}>
                <div className={answ.answProfile}>
                  <div className={answ.answImage}>
                    <Image
                      src={item.imageURL}
                      width={60}
                      height={60}
                      style={{ objectFit: "cover", borderRadius: "50%" }}
                      alt="Picture of the author"
                      title={item.username}
                    />
                  </div>
                  <div className={answ.answUser}>
                    <span id={answ.answName}>{item.username}</span>
                    <span id={answ.answDate}>{item.date}</span>
                  </div>
                </div>
                <div className={answ.answText}>
                  <p>{item.comment}</p>
                </div>
                <div className={answ.answBtn}>
                  <span className={answ.answComment} title="Answer">
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
                      style={{ cursor: "pointer" }}
                    >
                      <path d="M20.24 12.24a6 6 0 0 0-8.49-8.49L5 10.5V19h8.5z"></path>
                      <path d="M16 8 2 22"></path>
                      <path d="M17.5 15H9"></path>
                    </svg>
                  </span>
                  <span className={answ.answUpvote} title="Upvote">
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
                      style={{ cursor: "pointer" }}
                    >
                      <path d="M12 19V5"></path>
                      <path d="m5 12 7-7 7 7"></path>
                    </svg>
                    <span id={answ.counter}>{item.interactions.upvotes}</span>
                  </span>
                  <span className={answ.answDownVote} title="Downvote">
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
                      style={{ cursor: "pointer" }}
                    >
                      <path d="M12 5v14"></path>
                      <path d="m19 12-7 7-7-7"></path>
                    </svg>
                    <span id={answ.counter}>{item.interactions.downvotes}</span>
                  </span>
                </div>
              </div>
            </Fragment>
          );
        })}
      </main>
    </>
  );
}
