import Head from "next/head";
import Image from "next/image";
import { Inter } from "next/font/google";
import styles from "@/styles/Home.module.css";
import Header from "@/components/main/Header";
import FloatMenu from "@/components/sub/float";
import Dialogue from "@/components/sub/dialogue";
import Center from "@/components/main/home/center";

import { createClient } from "@supabase/supabase-js";
import { useUser } from "@clerk/nextjs";
import { useEffect, useState } from "react";
import axios from "axios";
import { useRouter } from "next/router";

const inter = Inter({ subsets: ["latin"] });

type configProps = {
  SupabaseAPPURL: string;
  PublicAnonKey: string;
};

const config: configProps = {
  SupabaseAPPURL: process.env.NEXT_PUBLIC_SUPABASE_URL as string,
  PublicAnonKey: process.env.NEXT_PUBLIC_SUPABASE_PUBLIC_ANON_KEY as string,
};

const supabase = createClient(config.SupabaseAPPURL, config.PublicAnonKey);

type TypeQImageProps = {
  isImageUploading: boolean;
  isComponentVisible: boolean;
  isImageComponentVisible: boolean;
  qImageURL: string;
};

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
    isErr: false,
    logMessage: "",
    headerMessage: "",
  });
  const [qImageProps, setQImageProps] = useState<TypeQImageProps>({
    isImageUploading: false,
    isComponentVisible: false,
    isImageComponentVisible: false,
    qImageURL: "",
  });

  type ImageProps = typeof qImageProps;

  const [isFetching, setIsFetching] = useState(false);

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
        thumbnailURL: qImageProps.qImageURL,
        question: value,
      })
      .then(function (response) {
        fetchQuestions();
        setValue("");
        setIsPosting(false);
        setQImageProps((prev) => {
          return {
            ...prev,
            isComponentVisible: true,
          };
        });
      })
      .catch(function (error) {
        console.error(error.response);
        setIsPosting(false);
      });
  };

  const fetchQuestions = async () => {
    setIsFetching(true);
    axios
      .get("https://api-resubase.vercel.app/questions")
      .then(function (response) {
        setQuestion(response.data);
        setIsFetching(false);
      })
      .catch(function (error) {
        console.error(error.response);
        setIsFetching(false);
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
        fetchQuestions();
      })
      .catch(function (error) {
        console.error(error.response);
        setLogState((prev) => {
          return {
            ...prev,
            isVisible: true,
            isErr: true,
            logMessage: error.response.data.error,
            headerMessage: "Unauthroized Access",
          };
        });
      });
  };

  const upvoteQuestion = async (id: string) => {
    axios
      .put(`https://api-resubase.vercel.app/upvote/${id}`)
      .then(function (response) {
        fetchQuestions();
      })
      .catch(function (error) {
        console.error(error.response);
      });
  };
  const downvoteQuestion = async (id: string) => {
    axios
      .put(`https://api-resubase.vercel.app/downvote/${id}`)
      .then(function (response) {
        fetchQuestions();
      })
      .catch(function (error) {
        console.error(error.response);
      });
  };

  const handleImageUpload = async (event: any) => {
    setQImageProps((prev) => {
      return {
        ...prev,
        isImageUploading: true,
      };
    });
    const file = event.target.files[0];
    const fileName = file.name;
    if (!file) {
      console.log("No file selected");
      setQImageProps((prev) => {
        return {
          ...prev,
          isImageUploading: false,
        };
      });
      return;
    }

    const { data, error } = await supabase.storage
      .from("images")
      .upload(`public/${fileName}`, file, {
        cacheControl: "3600",
        upsert: true,
      });

    if (error) {
      console.error(error);
    }
    await getPublicURL(fileName, event);
  };

  async function getPublicURL(
    fileName: string,
    event: { target: { value: string } }
  ) {
    const { data } = supabase.storage
      .from("images")
      .getPublicUrl(`public/${fileName}`);

    if (!data) {
      console.error("No data");
    }
    setQImageProps((prev) => {
      return {
        ...prev,
        qImageURL: data.publicUrl,
        isImageUploading: false,
      };
    });
    setLogState((prev) => {
      return {
        ...prev,
        isVisible: true,
        isErr: false,
        logMessage:
          "Your image assets has been uploaded to the server sucessfully",
        headerMessage: "Image Uploaded!",
      };
    });
    event.target.value = "";
  }

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
        <title>Resubase - Designed to cater the needs of developers</title>
        <meta
          name="description"
          content="Resubase is a powerful platform designed to cater to the needs of developers worldwide."
        />
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
        <meta
          property="og:title"
          content="Resubase - Designed to cater the needs of developers"
        />
        <meta property="og:url" content="resubase.vercel.app" />
        <meta property="og:image" content="/resubase-default.png" />
        <meta property="og:site_name" content="Resubase" />
        <meta property="og:type" content="website" />
        <meta
          property="og:description"
          content="Resubase is a powerful platform designed to cater to the needs of developers worldwide."
        />
        <meta
          property="og:title"
          content="Resubase is a powerful platform designed to cater to the needs of developers worldwide."
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
      <main className={`${styles.main}`}>
        <Header styles={styles} />
        <Center
          value={value}
          handleTextUpdate={handleTextUpdate}
          isActive={isActive}
          isPosting={isPosting}
          submitQuestion={submitQuestion}
          handleImageUpload={handleImageUpload}
          isFetching={isFetching}
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
        <FloatMenu
          styles={styles}
          isFloatActive={isFloatActive}
          setIsFloatActive={setIsFloatActive}
          questionID={questionID}
        />
        <Dialogue
          styles={styles}
          hideDialogue={hideDialogue}
          logState={logState}
        />
      </main>
    </>
  );
}
