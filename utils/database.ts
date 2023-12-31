import mongoose, { ConnectOptions } from "mongoose";
import { handleError } from "@utils/errorHandler";
import { FUNCTIONS } from "@app/constants/consts";

let isConnected = false;

export const connectToDB = async () => {
  mongoose.set("strictQuery", true);

  if (isConnected) {
    console.log("MongoDB is already connected");
    return;
  }

  try {
    await mongoose.connect(process.env.MONGODB_URI ?? "", {
      dbName: "share_prompt",
    } as ConnectOptions);
    isConnected = true;
    console.log("MongoDB connected");
  } catch (e: any) {
    handleError(e, FUNCTIONS.CONNECT_TO_DB);
  }
};
