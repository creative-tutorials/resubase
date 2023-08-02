import Head from "next/head";
import Image from "next/image";
import { Inter } from "next/font/google";
import styles from "@/styles/Home.module.css";
import FloatMenu from "@/components/sub/float";
import { UserButton, useUser } from "@clerk/nextjs";
import { useEffect, useCallback, useState, Fragment } from "react";
import axios from "axios";
import { useRouter } from "next/router";

const inter = Inter({ subsets: ["latin"] });

interface QuestionProp {
  username: string;
  date: string;
  question: string;
  questionID: string;
  imageURL: string;
  interactions: {
    upvotes: number;
    downvotes: number;
  };
}

export default function Home() {
  const [isActive, setIsActive] = useState(false);
  const [value, setValue] = useState("");
  const [counter, setCounter] = useState(0);
  const [question, setQuestion] = useState([]);
  const [isPosting, setIsPosting] = useState(false);
  const [isFloatActive, setIsFloatActive] = useState(false);
  const [questionID, setQuestionID] = useState("");

  const { isSignedIn, user } = useUser();

  const router = useRouter();

  useEffect(() => {
    setCounter((prev) => prev + 1);
    counter === 1 && fetchQuestions();

    return () => {
      setCounter(0);
    };
  }, [counter]);

  const handleTextUpdate = (event: any) => {
    setValue(event.target.value);
    if (event.target.value.length > 0) {
      setIsActive(true);
    } else {
      setIsActive(false);
    }
  };

  const submitQuestion = async () => {
    if (!isSignedIn) {
      console.error("User not signed in");
    }
    const userData = user;
    setIsPosting(true);
    axios
      .post("https://api-resubase.vercel.app/question/create", {
        userid: userData?.id,
        username: userData?.fullName,
        imageURL: userData?.profileImageUrl,
        question: value,
      })
      .then(function (response) {
        fetchQuestions();
        setValue("");
        setIsPosting(false);
      })
      .catch(function (error) {
        console.error(error.response);
        setIsPosting(false);
      });
  };

  const fetchQuestions = async () => {
    axios
      .get("https://api-resubase.vercel.app/questions")
      .then(function (response) {
        setQuestion(response.data);
      })
      .catch(function (error) {
        console.error(error.response);
      });
  };

  const viewAnswers = (id: string) => {
    router.push(`/answers/${id}`);
  };

  return (
    <>
      <Head>
        <title>Resubase</title>
        <meta name="description" content="Feather your Question...." />
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
      <main className={`${styles.main}`}>
        <div className={styles.header}>
          <div className={styles.inputBx}>
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
            >
              <path d="M11 3a8 8 0 1 0 0 16 8 8 0 1 0 0-16z"></path>
              <path d="m21 21-4.35-4.35"></path>
            </svg>
            <input type="text" placeholder="Search" />
          </div>
          <div className={styles.UserProfile}>
            <UserButton />
          </div>
        </div>
        <div className={styles.center}>
          <div className={styles.field}>
            <textarea
              name=""
              id=""
              value={value}
              cols={30}
              rows={10}
              placeholder="Write something here..."
              onChange={handleTextUpdate}
            ></textarea>
            <div className={styles.bottomField}>
              <div className={styles.btnBx}>
                <button
                  id={styles.postBtn}
                  className={isActive ? styles.active : ""}
                  data-state={isPosting ? "active" : ""}
                  onClick={submitQuestion}
                >
                  {isPosting ? "Posting" : "Post"}
                </button>
              </div>
              <div className={styles.media}>
                <input
                  type="file"
                  name="image-file"
                  id="upload-image"
                  hidden
                  accept="image/*"
                />
                <label
                  htmlFor="upload-image"
                  className={styles.uploadBtn}
                  title="Upload Media"
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
                    style={{ cursor: "pointer" }}
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <rect
                      width="18"
                      height="18"
                      x="3"
                      y="3"
                      rx="2"
                      ry="2"
                    ></rect>
                    <path d="M8.5 7a1.5 1.5 0 1 0 0 3 1.5 1.5 0 1 0 0-3z"></path>
                    <path d="m21 15-5-5L5 21"></path>
                  </svg>
                </label>
              </div>
            </div>
          </div>
          <div className={styles.question}>
            {question.map((item: QuestionProp, index: number) => {
              return (
                <Fragment key={index}>
                  <div className={styles.qusBx}>
                    <div className={styles.qusProfile}>
                      <div className={styles.qusImage}>
                        <Image
                          src={item.imageURL}
                          width={60}
                          height={60}
                          style={{ objectFit: "cover", borderRadius: "50%" }}
                          alt="Picture of the author"
                          title={item.username}
                        />
                      </div>
                      <div className={styles.qusUser}>
                        <span id={styles.qusName}>{item.username}</span>
                        <span id={styles.qusDate}>{item.date}</span>
                      </div>
                    </div>
                    <div className={styles.qusText}>
                      <p>{item.question}</p>
                    </div>
                    <div className={styles.qusBtn}>
                      <span
                        className={styles.qusComment}
                        title="Answer"
                        onClick={() => {
                          setIsFloatActive(true);
                          setQuestionID(item.questionID);
                        }}
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
                          style={{ cursor: "pointer" }}
                        >
                          <path d="M20.24 12.24a6 6 0 0 0-8.49-8.49L5 10.5V19h8.5z"></path>
                          <path d="M16 8 2 22"></path>
                          <path d="M17.5 15H9"></path>
                        </svg>
                      </span>
                      <span className={styles.qusUpvote} title="Upvote">
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
                        <span id={styles.counter}>
                          {item.interactions.upvotes}
                        </span>
                      </span>
                      <span className={styles.qusDownVote} title="Downvote">
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
                        <span id={styles.counter}>
                          {item.interactions.downvotes}
                        </span>
                      </span>
                      <span
                        className={styles.qusView}
                        title="View Answers"
                        onClick={() => viewAnswers(item.questionID)}
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
                          style={{ cursor: "pointer" }}
                        >
                          <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"></path>
                          <path d="M12 9a3 3 0 1 0 0 6 3 3 0 1 0 0-6z"></path>
                        </svg>
                      </span>
                    </div>
                  </div>
                </Fragment>
              );
            })}
          </div>
        </div>
        <FloatMenu
          styles={styles}
          isFloatActive={isFloatActive}
          setIsFloatActive={setIsFloatActive}
          questionID={questionID}
        />
      </main>
    </>
  );
}
