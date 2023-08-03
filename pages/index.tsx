import Head from "next/head";
import { Inter } from "next/font/google";
import styles from "@/styles/Home.module.css";
import FloatMenu from "@/components/sub/float";
import Question from "@/components/main/questionBx";
import { UserButton, useUser } from "@clerk/nextjs";
import { useEffect, useCallback, useState } from "react";
import axios from "axios";
import { useRouter } from "next/router";

const inter = Inter({ subsets: ["latin"] });

export default function Home() {
  const [isActive, setIsActive] = useState(false);
  const [value, setValue] = useState("");
  const [counter, setCounter] = useState(0);
  const [question, setQuestion] = useState([]);
  const [isPosting, setIsPosting] = useState(false);
  const [isFloatActive, setIsFloatActive] = useState(false);
  const [questionID, setQuestionID] = useState("");
  const [logState, setLogState] = useState({
    isVisible: false,
    logMessage: "aa",
  });

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

  const deletePost = (id: string) => {
    if (!isSignedIn) {
      console.error("User not signed in");
    }
    const userData = user;
    axios
      .delete(`https://api-resubase.vercel.app/question/${id}`, {
        data: {
          userid: userData?.id,
        },
      })
      .then(function (response) {
        console.log(response.data);

        fetchQuestions();
      })
      .catch(function (error) {
        console.error(error.response);
        setLogState((prev) => {
          return {
            ...prev,
            isVisible: true,
            logMessage: error.response.data.error,
          };
        });
      });
  };

  const viewAnswers = (id: string) => {
    router.push(`/answers/${id}`);
  };

  const hideDialogue = () => {
    setLogState((prev) => {
      return {
        ...prev,
        isVisible: false,
        logMessage: "",
      };
    });
  };

  return (
    <>
      <Head>
        <title>Resubase</title>
        <meta
          name="description"
          content="Resubase is a powerful platform designed to cater to the needs of developers worldwide."
        />
        <meta name="google-site-verification" content="l1a2fyP4jz21WqSIR2HNxLAyt__hUNkV-48f_zbVHYE" />
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
          <Question
            question={question}
            setIsFloatActive={setIsFloatActive}
            setQuestionID={setQuestionID}
            viewAnswers={viewAnswers}
            styles={styles}
            deletePost={deletePost}
          />
        </div>
        <FloatMenu
          styles={styles}
          isFloatActive={isFloatActive}
          setIsFloatActive={setIsFloatActive}
          questionID={questionID}
        />
        <div
          className={styles.dialogueWrapper}
          id={logState.isVisible ? styles.active : ""}
        >
          <div className={styles.dialogue}>
            <div className={styles.dialogueHeader}>
              <h3>Unauthroized Access</h3>
            </div>
            <div className={styles.dialogueCenter}>
              <p>{logState.logMessage}</p>
            </div>
            <div className={styles.dialogueButtons}>
              <button id={styles.cancel} onClick={hideDialogue}>
                Cancel
              </button>
            </div>
          </div>
        </div>
      </main>
    </>
  );
}
