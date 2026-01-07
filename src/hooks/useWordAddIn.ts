import { useState, useCallback } from "react";
import { OpenAIService, createOpenAIService } from "../services/OpenAIService";
import { WordService, createWordService } from "../services/WordService";
import { Notification, NotificationType, LoadingState } from "../types";

export const useWordAddIn = () => {
  const [prompt, setPrompt] = useState<string>("");
  const [loadingState, setLoadingState] = useState<LoadingState>({
    isLoading: false,
  });
  const [notification, setNotification] = useState<Notification | null>(null);

  const [aiService] = useState<OpenAIService>(() => createOpenAIService());
  const [wordService] = useState<WordService>(() => createWordService());

  const showNotification = useCallback(
    (type: NotificationType, message: string, duration: number = 3000) => {
      setNotification({ type, message, duration });
      setTimeout(() => setNotification(null), duration);
    },
    []
  );

  const handleSubmit = useCallback(
    async (e?: React.FormEvent) => {
      e?.preventDefault();

      if (!prompt.trim()) {
        showNotification(NotificationType.ERROR, "Please enter a prompt");
        return;
      }

      if (!wordService.isOfficeReady()) {
        showNotification(
          NotificationType.ERROR,
          "Office.js is not initialized. Please open this add-in in Word."
        );
        return;
      }

      try {
        setLoadingState({
          isLoading: true,
          message: "Generating content...",
        });

        const aiResponse = await aiService.generateContent({ prompt });

        if (!aiResponse.success) {
          throw new Error(aiResponse.error || "Failed to generate content");
        }

        setLoadingState({
          isLoading: true,
          message: "Inserting into document...",
        });

        await wordService.insertTextAtCursor(aiResponse.content);

        showNotification(
          NotificationType.SUCCESS,
          "Content successfully inserted!"
        );

        setPrompt("");
      } catch (error) {
        showNotification(
          NotificationType.ERROR,
          error instanceof Error
            ? error.message
            : "An unexpected error occurred"
        );
      } finally {
        setLoadingState({ isLoading: false });
      }
    },
    [prompt, aiService, wordService, showNotification]
  );

  const updatePrompt = useCallback((value: string) => {
    setPrompt(value);
  }, []);

  const clearNotification = useCallback(() => {
    setNotification(null);
  }, []);

  return {
    prompt,
    loadingState,
    notification,
    updatePrompt,
    handleSubmit,
    clearNotification,
  };
};
