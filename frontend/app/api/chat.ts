const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;

export const getChat = async (userId: string): Promise<GetChatResponse> => {
  const res = await fetch(`${API_BASE_URL}/api/chat/${userId}`, {
    method: "GET",
    headers: { "Content-Type": "application/json" },
  });
  if (!res.ok) {
    const error = await res.json();
    throw new Error(
      error?.error || "Something went wrong. Please try again later"
    );
  }

  return res.json();
}; 

export const postChat = async (
  content: string,
  userId?: string
): Promise<PostChatResponse> => {
  const body: {
    messages: { role: "user"; content: string }[];
    userId?: string;
  } = {
    messages: [{ role: "user", content }],
  };

  if (userId) {
    body.userId = userId;
  }
  
  const res = await fetch(`${API_BASE_URL}/api/chat`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(body),
  });

  if (!res.ok) {
    const error = await res.json();
    throw new Error(error?.error || "Failed to create user");
  }

  return res.json();
};