const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;

export const createUser = async (
  username: string,
  language?: string,
  style?: string
): Promise<UserResponse> => {
  console.log("inAPI", username, language, style);
  const res = await fetch(`${API_BASE_URL}/api/users`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ username, language, style }),
  });

  if (!res.ok) {
    const error = await res.json();
    throw new Error(error?.error || "Failed to create user");
  }

  return res.json();
};

export const getUser = async (userId: string): Promise<UserResponse> => {
  const res = await fetch(`${API_BASE_URL}/api/users/${userId}`, {
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

export const putUser = async (
  userId: string,
  language: string,
  style: string
): Promise<putMessages> => {
  const res = await fetch(`${API_BASE_URL}/api/users/${userId}/settings`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ language, style }),
  });

  if (!res.ok) {
    const error = await res.json();
    throw new Error(
      error?.error || "Failed to put user. Please try again later"
    );
  }

  return res.json();
};