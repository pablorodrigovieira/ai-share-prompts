import { connectToDB } from "@utils/database";
import Prompt from "@models/prompt";

export const POST = async (request: Request) => {
  try {
    const { userId, prompt, tag } = await request.json();
    await connectToDB();
    const newPrompt = new Prompt({
      creator: userId,
      prompt,
      tag,
    });
    await newPrompt.save();
    return new Response(JSON.stringify(newPrompt), { status: 201 });
  } catch (e: any) {
    return new Response("Failed to create a new prompt", { status: 500 });
  }
};
