import axios from "axios";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import styles from "@/styles/Home.module.css";
import qstyles from "@/styles/querystyles.module.css";
import Image from "next/image";

export default function QueryQuestion() {
  const router = useRouter();
  const { id } = router.query;
  const [counter, setCounter] = useState(0);
  const [isFetching, setIsFetching] = useState(false);
  const [questions, setQuestions] = useState({
    date: "",
    questionID: "",
    question: "",
    imageURL: "",
    thumbnailURL: "",
    interactions: {
      upvotes: 0,
      downvotes: 0,
    },
    isNew: false,
    username: "",
  });

  useEffect(() => {
    if (!id) {
      return;
    } else {
      console.log("Q.");
    }
    setCounter((prev) => prev + 1);
    counter === 1 || (id && fetchQuestion());

    return () => {
      setCounter(0);
    };
  }, [counter, id]);

  const fetchQuestion = async () => {
    setIsFetching(true);
    axios
      .get(`https://api-resubase.vercel.app/question/query/${id}`)
      .then(function (response) {
        setIsFetching(false);
        setQuestions(response.data);
      })
      .catch(function (error) {
        console.error(error.response);
        setIsFetching(false);
      });
  };

  const upvoteQuestion = async (id: string) => {
    axios
      .put(`https://api-resubase.vercel.app/upvote/${id}`)
      .then(function (response) {
        fetchQuestion();
      })
      .catch(function (error) {
        console.error(error.response);
      });
  };
  const downvoteQuestion = async (id: string) => {
    axios
      .put(`https://api-resubase.vercel.app/downvote/${id}`)
      .then(function (response) {
        fetchQuestion();
      })
      .catch(function (error) {
        console.error(error.response);
      });
  };

  return (
    <main className={qstyles.main}>
      <div className={qstyles.center}>
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
            {questions.thumbnailURL && (
              <div className={styles.qusThumb}>
                <Image
                  src={questions.thumbnailURL}
                  width={500}
                  height={500}
                  alt="Image"
                />
              </div>
            )}
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
      </div>
    </main>
  );
}
