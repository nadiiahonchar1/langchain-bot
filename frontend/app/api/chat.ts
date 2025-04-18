const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;

export const getChat = async (userId: string) => {
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