import OpenAI from "openai";
import type { ChatCompletionMessageParam } from "openai/resources/chat/completions";
import { AIRequest, AIResponse } from "../types";

export class OpenAIService {
  private openai: OpenAI;
  private model: string;

  constructor(model?: string) {
    this.openai = new OpenAI({
      apiKey: process.env.OPENAI_API_KEY,
      dangerouslyAllowBrowser: true,
    });
    this.model = model || process.env.OPENAI_MODEL || "gpt-4";
  }

  async generateContent(request: AIRequest): Promise<AIResponse> {
    try {
      if (!request.prompt || request.prompt.trim().length === 0) {
        return {
          content: "",
          success: false,
          error: "Prompt cannot be empty",
        };
      }

      const messages: ChatCompletionMessageParam[] = [
        {
          role: "system",
          content:
            "You are a helpful assistant that generates professional content for Microsoft Word documents.",
        },
        {
          role: "user",
          content: request.prompt,
        },
      ];

      const chatCompletion = await this.openai.chat.completions.create({
        messages,
        model: this.model,
        stream: false,
      });

      const content = chatCompletion.choices[0]?.message?.content || "";

      return {
        content,
        success: true,
      };
    } catch (error) {
      console.error("Error in OpenAI completion:", error);
      return {
        content: "",
        success: false,
        error:
          error instanceof Error ? error.message : "Unknown error occurred",
      };
    }
  }

  isConfigured(): boolean {
    return !!process.env.OPENAI_API_KEY;
  }

  getModel(): string {
    return this.model;
  }
}

export const createOpenAIService = (model?: string): OpenAIService => {
  return new OpenAIService(model || process.env.OPENAI_MODEL);
};
