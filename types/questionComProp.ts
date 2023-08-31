import { Dispatch, SetStateAction } from "react";
export type QuestiopComProp = {
  question: never[];
  setIsFloatActive: Dispatch<SetStateAction<boolean>>;
  setQuestionID: Dispatch<SetStateAction<string>>;
  viewAnswers: (id: string) => void;
  styles: {
    readonly [key: string]: string;
  };
  deletePost: (id: string) => void;
  upLikes: (id: string) => void;
};