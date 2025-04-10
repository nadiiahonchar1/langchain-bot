type Dictionary = {
  [key: string]: string;
  style: Record<string, string>;
};

interface CreateUserResponse {
  userId: string;
  username: string;
  language: string;
  style: string;
  createdAt: string;
}