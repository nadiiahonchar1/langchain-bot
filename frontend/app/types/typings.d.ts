type Dictionary = {
  [key: string]: string;
  style: Record<string, string>;
};

interface UserResponse {
  userId: string;
  username: string;
  language: string;
  style: string;
  createdAt: string;
}

interface putMessages {
  success: boolean;
  message: string;
}

type ChatMessage = {
  role: "user" | "system";
  content: string;
};

type GetChatResponse = ChatMessage[];

type PostChatResponse = {
  content: string;
};