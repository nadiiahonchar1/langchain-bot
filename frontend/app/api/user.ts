const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;

export const createUser = async (
  username: string
): Promise<CreateUserResponse> => {
  const res = await fetch(`${API_BASE_URL}/api/users`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ username }),
  });

  if (!res.ok) {
    const error = await res.json();
    throw new Error(error?.error || "Failed to create user");
  }

  return res.json();
};
