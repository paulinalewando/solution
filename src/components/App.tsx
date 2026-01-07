import React from "react";
import { useWordAddIn } from "../hooks/useWordAddIn";
import { Button } from "./Button";
import { Input } from "./Input";
import { LoadingSpinner } from "./LoadingSpinner";
import { Toast } from "./Toast";
import styles from "./App.module.scss";

export const App: React.FC = () => {
  const {
    prompt,
    loadingState,
    notification,
    updatePrompt,
    handleSubmit,
    clearNotification,
  } = useWordAddIn();

  const examplePrompts = [
    "Write a professional email",
    "Create a summary of key points",
    "Generate a list of steps",
  ];

  return (
    <div className={styles.appContainer}>
      <header className={styles.header}>
        <h1 className={styles.title}>AI Content Generator</h1>
        <p className={styles.subtitle}>
          Generate intelligent content and insert it into your document
        </p>
      </header>

      <main className={styles.main}>
        {loadingState.isLoading ? (
          <div className={styles.loadingContainer}>
            <LoadingSpinner message={loadingState.message} size="medium" />
          </div>
        ) : (
          <form onSubmit={handleSubmit} className={styles.form}>
            <Input
              value={prompt}
              onChange={updatePrompt}
              placeholder="Enter your prompt here... (e.g., 'Write a professional email about...', 'Create a list of...')"
              multiline
              rows={6}
              label="Your Prompt"
            />

            <Button type="submit" fullWidth variant="primary">
              Generate & Insert
            </Button>

            <div className={styles.examplesContainer}>
              <p className={styles.examplesTitle}>Example prompts:</p>
              <div className={styles.examplesList}>
                {examplePrompts.map((example, index) => (
                  <button
                    key={index}
                    type="button"
                    onClick={() => updatePrompt(example)}
                    className={styles.exampleButton}
                  >
                    {example}
                  </button>
                ))}
              </div>
            </div>
          </form>
        )}
      </main>

      <footer className={styles.footer}>
        <p className={styles.footerText}>
          💡 Tip: Place your cursor where you want to insert the content
        </p>
      </footer>

      {notification && (
        <Toast notification={notification} onClose={clearNotification} />
      )}
    </div>
  );
};
