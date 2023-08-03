import { Dispatch, Fragment, SetStateAction } from "react";
import Image from "next/image";
interface QuestiopComProp {
  question: never[];
  setIsFloatActive: Dispatch<SetStateAction<boolean>>;
  setQuestionID: Dispatch<SetStateAction<string>>;
  viewAnswers: (id: string) => void;
  styles: {
    readonly [key: string]: string;
  },
  deletePost: (id: string) => void
}

export default function Question({
  question,
  setIsFloatActive,
  setQuestionID,
  viewAnswers,
  styles,
  deletePost,
}: QuestiopComProp) {
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


  
  return (
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
                    style={{
                      objectFit: "cover",
                      borderRadius: "50%",
                    }}
                    alt="User"
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
                    style={{
                      cursor: "pointer",
                    }}
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
                    style={{
                      cursor: "pointer",
                    }}
                  >
                    <path d="M12 19V5"></path>
                    <path d="m5 12 7-7 7 7"></path>
                  </svg>
                  <span id={styles.counter}>{item.interactions.upvotes}</span>
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
                    style={{
                      cursor: "pointer",
                    }}
                  >
                    <path d="M12 5v14"></path>
                    <path d="m19 12-7 7-7-7"></path>
                  </svg>
                  <span id={styles.counter}>{item.interactions.downvotes}</span>
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
                    style={{
                      cursor: "pointer",
                    }}
                  >
                    <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"></path>
                    <path d="M12 9a3 3 0 1 0 0 6 3 3 0 1 0 0-6z"></path>
                  </svg>
                </span>
                <span
                  className={styles.qusDelete}
                  title="Delete Post"
                  onClick={() => deletePost(item.questionID)}
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
    </div>
  );
}
