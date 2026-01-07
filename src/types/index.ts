export interface AIRequest {
  prompt: string;
  maxTokens?: number;
  temperature?: number;
}

export interface AIResponse {
  content: string;
  success: boolean;
  error?: string;
}

export enum NotificationType {
  SUCCESS = "success",
  ERROR = "error",
  INFO = "info",
}

export interface Notification {
  type: NotificationType;
  message: string;
  duration?: number;
}

export interface LoadingState {
  isLoading: boolean;
  message?: string;
}
