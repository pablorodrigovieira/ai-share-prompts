import { connectToDB } from "@utils/database";
import Prompt from "@models/prompt";

// GET
export const GET = async (request, { params }) => {
  try {
    await connectToDB();
    const prompt = await Prompt.findById(params.id).populate("creator");
    if (!prompt) {
      return new Response("Prompt not found", { status: 404 });
    }
    return new Response(JSON.stringify(prompt), { status: 200 });
  } catch (e) {
    return new Response("Failed to get prompt by ID", { status: 500 });
  }
};

// PATCH / UPDATE
export const PATCH = async (request, { params }) => {
  try {
    const { prompt, tag } = await request.json();

    await connectToDB();
    const currentPrompt = await Prompt.findById(params.id);

    if (!currentPrompt) {
      return new Response("Prompt not found", { status: 404 });
    }

    currentPrompt.tag = tag;
    currentPrompt.prompt = prompt;

    await currentPrompt.save();

    return new Response(JSON.stringify(currentPrompt), { status: 200 });
  } catch (e) {
    return new Response("Failed to update the prompt", { status: 500 });
  }
};

// DELETE
export const DELETE = async (request, { params }) => {
  try {
    await connectToDB();
    await Prompt.findByIdAndRemove(params.id);
    return new Response("Prompt deleted successfully", { status: 200 });
  } catch (e) {
    return new Response("Failed to delete prompt", { status: 500 });
  }
};
