import Question from "@/components/main/questionBx";
import { Dispatch, SetStateAction } from "react";

type TypeQImageProps = {
  isImageUploading: boolean;
  isComponentVisible: boolean;
  isImageComponentVisible: boolean;
  qImageURL: string;
};

type CenterProps = {
  value: string;
  handleTextUpdate: (event: any) => void;
  isActive: boolean;
  isPosting: boolean;
  submitQuestion: () => Promise<void>;
  handleImageUpload: (event: any) => Promise<void>;
  isFetching: boolean;
  question: never[];
  setIsFloatActive: Dispatch<SetStateAction<boolean>>;
  setQuestionID: Dispatch<SetStateAction<string>>;
  viewAnswers: (id: string) => void;
  styles: {
    readonly [key: string]: string;
  };
  deletePost: (id: string) => void;
  upvoteQuestion: (id: string) => Promise<void>;
  downvoteQuestion: (id: string) => Promise<void>;
  qImageProps: TypeQImageProps;
};

export default function Center({
  value,
  handleTextUpdate,
  isActive,
  isPosting,
  submitQuestion,
  handleImageUpload,
  isFetching,
  question,
  setIsFloatActive,
  setQuestionID,
  viewAnswers,
  styles,
  deletePost,
  upvoteQuestion,
  downvoteQuestion,
  qImageProps,
}: CenterProps) {
  return (
    <div className={styles.center}>
      <div className={styles.field}>
        <textarea
          name=""
          id=""
          value={value}
          cols={30}
          rows={10}
          placeholder="What's on your mind right now?"
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
              onChange={handleImageUpload}
            />
            <label
              htmlFor="upload-image"
              className={styles.uploadBtn}
              title="Media"
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
                style={{
                  cursor: "pointer",
                }}
                xmlns="http://www.w3.org/2000/svg"
              >
                <rect width="18" height="18" x="3" y="3" rx="2" ry="2"></rect>
                <path d="M8.5 7a1.5 1.5 0 1 0 0 3 1.5 1.5 0 1 0 0-3z"></path>
                <path d="m21 15-5-5L5 21"></path>
              </svg>
            </label>
          </div>
          <div
            className={styles.load_}
            id={qImageProps.isImageUploading ? styles.active : ""}
          >
            <div className={styles.loadWrapper}>
              <span id={styles.loadText}>
                <div className={styles.pulse}></div>Image Uploading....
              </span>
            </div>
          </div>
        </div>
      </div>
      {isFetching ? (
        <div className={styles.shapes_center}>
          <div className={styles.shapes}></div>
        </div>
      ) : (
        <Question
          question={question}
          setIsFloatActive={setIsFloatActive}
          setQuestionID={setQuestionID}
          viewAnswers={viewAnswers}
          styles={styles}
          deletePost={deletePost}
          upvoteQuestion={upvoteQuestion}
          downvoteQuestion={downvoteQuestion}
          qImageProps={qImageProps}
        />
      )}
    </div>
  );
}
