export class WordService {
  /**
   * Insert text at the current cursor position
   * Uses Office.js Word API with proper error handling
   */
  async insertTextAtCursor(text: string): Promise<void> {
    try {
      await Word.run(async (context) => {
        // Get the current selection (cursor position)
        const selection = context.document.getSelection();

        // Insert text at the selection
        selection.insertText(text, Word.InsertLocation.replace);

        // Sync to apply changes to the document
        await context.sync();
      });
    } catch (error) {
      throw new Error(
        `Failed to insert text: ${
          error instanceof Error ? error.message : "Unknown error"
        }`
      );
    }
  }

  /**
   * Insert formatted text with additional styling options
   * Demonstrates extensibility for future enhancements
   */
  async insertFormattedText(
    text: string,
    options?: {
      bold?: boolean;
      italic?: boolean;
      fontSize?: number;
      color?: string;
    }
  ): Promise<void> {
    try {
      await Word.run(async (context) => {
        const selection = context.document.getSelection();
        const range = selection.insertText(text, Word.InsertLocation.replace);

        // Apply formatting if provided
        if (options?.bold) {
          range.font.bold = true;
        }
        if (options?.italic) {
          range.font.italic = true;
        }
        if (options?.fontSize) {
          range.font.size = options.fontSize;
        }
        if (options?.color) {
          range.font.color = options.color;
        }

        await context.sync();
      });
    } catch (error) {
      throw new Error(
        `Failed to insert formatted text: ${
          error instanceof Error ? error.message : "Unknown error"
        }`
      );
    }
  }

  /**
   * Check if Office.js is initialized and ready
   */
  isOfficeReady(): boolean {
    return typeof Office !== "undefined" && Office.context !== undefined;
  }

  /**
   * Get selected text from document (useful for context-aware AI prompts)
   */
  async getSelectedText(): Promise<string> {
    try {
      let selectedText = "";

      await Word.run(async (context) => {
        const selection = context.document.getSelection();
        selection.load("text");
        await context.sync();
        selectedText = selection.text;
      });

      return selectedText;
    } catch (error) {
      throw new Error(
        `Failed to get selected text: ${
          error instanceof Error ? error.message : "Unknown error"
        }`
      );
    }
  }

  /**
   * Clear current selection
   */
  async clearSelection(): Promise<void> {
    try {
      await Word.run(async (context) => {
        const selection = context.document.getSelection();
        selection.insertText("", Word.InsertLocation.replace);
        await context.sync();
      });
    } catch (error) {
      throw new Error(
        `Failed to clear selection: ${
          error instanceof Error ? error.message : "Unknown error"
        }`
      );
    }
  }
}

/**
 * Factory function for creating WordService instances
 */
export const createWordService = (): WordService => {
  return new WordService();
};
