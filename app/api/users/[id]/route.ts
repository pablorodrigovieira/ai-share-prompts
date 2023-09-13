import { connectToDB } from "@utils/database";
import Prompt from "@models/prompt";
import { IParams } from "@utils/interfaces";

export const GET = async (
  request: Request,
  { params }: { params: IParams },
) => {
  try {
    await connectToDB();
    const prompts = await Prompt.find({
      creator: params && params.id,
    }).populate("creator");
    return new Response(JSON.stringify(prompts), { status: 200 });
  } catch (e) {
    return new Response("Failed to fetch all prompts", { status: 500 });
  }
};
