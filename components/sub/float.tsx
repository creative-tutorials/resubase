import { Dispatch, SetStateAction, useState } from "react";
import { useUser } from "@clerk/nextjs";
import axios from "axios";

interface FloatProps {
  styles: {
    readonly [key: string]: string;
  };
  isFloatActive: boolean;
  setIsFloatActive: Dispatch<SetStateAction<boolean>>;
  questionID: string;
}
export default function FloatMenu({
  styles,
  isFloatActive,
  setIsFloatActive,
  questionID,
}: FloatProps) {
  const [value, setValue] = useState("");
  const [isActive, setIsActive] = useState(false);
  const [isPublishing, setIsPublishing] = useState(false);

  const { isSignedIn, user } = useUser();

  const handleInputUpdate = (event: any) => {
    setValue(event.target.value);
    if (event.target.value.length > 0) {
      setIsActive(true);
    } else {
      setIsActive(false);
    }
  };

  const publishComment = async () => {
    if (!isSignedIn) {
      console.error("User not signed in");
    }
    const userData = user;
    if (!questionID) {
      console.error("Failed to fetch questionID");
    }
    setIsPublishing(true);
    axios
      .post(`https://api-resubase.vercel.app/comment/create/${questionID}`, {
        userid: userData?.id,
        username: userData?.fullName,
        imageURL: userData?.profileImageUrl,
        comment: value,
      })
      .then(function (response) {
        setValue("");
        setIsPublishing(false);
      })
      .catch(function (error) {
        console.error(error.response);
        setIsPublishing(false);
      });
  };

  return (
    <div className={styles.float} id={isFloatActive ? styles.active : ""}>
      <span className={styles.close} onClick={() => setIsFloatActive(false)} title="Close Float">
        <svg
          width="25"
          height="25"
          fill="none"
          stroke="#a9aaab"
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="2"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path d="M18 6 6 18"></path>
          <path d="m6 6 12 12"></path>
        </svg>
      </span>
      <div className={styles.commentBox}>
        <textarea
          name=""
          id=""
          value={value}
          cols={30}
          rows={10}
          placeholder="Feather your mind..."
          onChange={handleInputUpdate}
        ></textarea>
        <div className={styles.cmBtn}>
          <button
            id={styles.publish}
            className={isActive ? styles.active : ""}
            data-state={isPublishing ? "active" : ""}
            onClick={publishComment}
          >
            {isPublishing ? "Publishing" : "Publish"}
          </button>
        </div>
      </div>
    </div>
  );
}
