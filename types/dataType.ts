export type dataType = {
  projectName: string;
  dueDate: string;
  hasSubscription: string;
  thumbnailURL: string;
};

export type dataID = dataType & {
  id: string;
};