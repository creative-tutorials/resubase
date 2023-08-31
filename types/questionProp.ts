export type QuestionProp = {
  userid: string;
  username: string;
  date: string;
  question: string;
  questionID: string;
  imageURL: string;
  thumbnailURL: string;
  interactions: {
    answers: number;
    likes: number;
  };
};
