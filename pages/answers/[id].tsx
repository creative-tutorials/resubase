import axios from "axios";
import { useRouter } from "next/router";
import { Fragment, useEffect, useState } from "react";
import answ from "@/styles/answer.module.css";
import Image from "next/image";
import Head from "next/head";
import styles from "@/styles/Home.module.css";
interface CommentProp {
  comment: string;
  date: string;
  imageURL: string;
  interactions: {
    upvotes: number;
    downvotes: number;
  };
  questionID: string;
  isNew: boolean;
  username: string;
}

export default function Qustion() {
  const router = useRouter();
  const { id } = router.query;
  const [counter, setCounter] = useState(0);
  const [answers, setAnswers] = useState([]);
  const [questions, setQuestions] = useState({
    date: "",
    questionID: "",
    question: "",
    imageURL: "",
    interactions: {
      upvotes: 0,
      downvotes: 0,
    },
    isNew: false,
    username: "",
  });
  const [isFetching, setIsFetching] = useState(false);

  useEffect(() => {
    if (!id) {
      return;
    } else {
      console.log("Resubase");
    }
    setCounter((prev) => prev + 1);
    counter === 1 || (id && [fetchQuestions(id)]);

    return () => {
      setCounter(0);
    };
  }, [counter, id]);

  const fetchQuestions = async (id: string | string[]) => {
    setIsFetching(true);
    axios
      .get(`https://api-resubase.vercel.app/question/${id}`)
      .then(async function (response) {
        console.log(response.data);
        setQuestions(response.data);
        await fetchAnswers(id);
        setIsFetching(false);
      })
      .catch(function (error) {
        console.error(error.response);
        setIsFetching(false);
      });
  };

  const fetchAnswers = async (id: string | string[]) => {
    axios
      .get(`https://api-resubase.vercel.app/comments/${id}`)
      .then(function (response) {
        console.log(response.data);
        setAnswers(response.data);
      })
      .catch(function (error) {
        console.error(error.response);
      });
  };

  const upvoteQuestion = async (id: string) => {
    axios
      .put(`https://api-resubase.vercel.app/upvote/${id}`)
      .then(function (response) {
        fetchQuestions(id);
      })
      .catch(function (error) {
        console.error(error.response);
      });
  };
  const downvoteQuestion = async (id: string) => {
    axios
      .put(`https://api-resubase.vercel.app/downvote/${id}`)
      .then(function (response) {
        fetchQuestions(id);
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
        <meta
          name="google-site-verification"
          content="l1a2fyP4jz21WqSIR2HNxLAyt__hUNkV-48f_zbVHYE"
        />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta
          name="twitter:card"
          content="Resubase is a powerful platform designed to cater to the needs of developers worldwide."
        />
        <meta name="twitter:site" content="Resubase" />
        <meta name="twitter:creator" content="@timi" />
        <meta property="og:url" content="resubase.vercel.app" />
        <meta
          property="og:title"
          content="Resubase is a powerful platform designed to cater to the needs of developers worldwide."
        />

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
        <link rel="icon" href="/app/favicon.ico" sizes="any" />
        <link rel="manifest" href="/app/site.webmanifest" />
      </Head>
      <main className={answ.main}>
        <div className={answ.longLine}></div>
        {isFetching ? (
          <div className={styles.pulse}></div>
        ) : (
          <div className={styles.qusBx}>
            <div className={styles.qusProfile}>
              <div className={styles.qusImage}>
                <Image
                  src={isFetching ? "/man02.jpg" : questions.imageURL}
                  width={60}
                  height={60}
                  style={{
                    objectFit: "cover",
                    borderRadius: "50%",
                  }}
                  alt="User"
                  title={questions.username}
                />
              </div>
              <div className={styles.qusUser}>
                <span id={styles.qusName}>{questions.username}</span>
                <span id={styles.qusDate}>{questions.date}</span>
              </div>
            </div>
            <div className={styles.qusText}>
              <p>{questions.question}</p>
            </div>
            <div className={styles.qusBtn}>
              <span
                className={styles.qusUpvote}
                title="Upvote"
                onClick={() => upvoteQuestion(questions.questionID)}
              >
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
                  style={{
                    cursor: "pointer",
                  }}
                >
                  <path d="M12 19V5"></path>
                  <path d="m5 12 7-7 7 7"></path>
                </svg>
                <span id={styles.counter}>
                  {questions.interactions.upvotes}
                </span>
              </span>
              <span
                className={styles.qusDownVote}
                title="Downvote"
                onClick={() => downvoteQuestion(questions.questionID)}
              >
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
                  style={{
                    cursor: "pointer",
                  }}
                >
                  <path d="M12 5v14"></path>
                  <path d="m19 12-7 7-7-7"></path>
                </svg>
                <span id={styles.counter}>
                  {questions.interactions.downvotes}
                </span>
              </span>
            </div>
          </div>
        )}
        {answers.map((item: CommentProp, index) => {
          return (
            <Fragment key={index}>
              <div className={answ.answerBox}>
                <div className={answ.answProfile}>
                  <div className={answ.answImage}>
                    <Image
                      src={isFetching ? "/man02.jpg" : item.imageURL}
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
                  <span
                    className={styles.qusDelete}
                    title="Delete Post"
                    // onClick={() => deletePost(item.questionID)}
                  >
                    <svg
                      width="20"
                      height="20"
                      fill="none"
                      stroke="#f67f92"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      viewBox="0 0 24 24"
                      xmlns="http://www.w3.org/2000/svg"
                      style={{
                        cursor: "pointer",
                      }}
                    >
                      <path d="M3 6h18"></path>
                      <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path>
                      <path d="M10 11v6"></path>
                      <path d="M14 11v6"></path>
                    </svg>
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
