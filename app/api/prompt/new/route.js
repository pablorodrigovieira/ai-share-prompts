import { connectToDB } from '@utils/database';
import Prompt from '@models/prompt';

export const POST =  async (req, res) => {
  try {
    const { userId, prompt, tag } = await req.json();
    connectToDB();
    const newPrompt = new Prompt({
      creator: userId,
      prompt,
      tag
    });
    await newPrompt.save();
    return new Response(JSON.stringify(newPrompt), {status: 201});
  } catch (e){
    return new Response("Failed to create a new prompt", { status: 500 });
  }
}
