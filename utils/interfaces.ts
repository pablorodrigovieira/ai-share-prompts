export interface IPost {
  _id: string;
  prompt: string;
  tag: string;
  creator: {
    image: string;
    username: string;
    email: string;
    _id: string;
  };
}
