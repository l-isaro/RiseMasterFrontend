const API_BASE = "https://risemasterbackend.onrender.com/api";

export async function registerUser({ name, email, class_level }) {
  const response = await fetch(`${API_BASE}/users/register`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ name, email, class_level }),
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.error || "Registration failed");
  }

  return data;
}

export async function getTopics(userId) {
  const response = await fetch(
    `${API_BASE}/topics?user_id=${encodeURIComponent(userId)}`,
  );
  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.error || "Failed to load topics");
  }

  return data;
}

export async function getUserStats(userId) {
  const response = await fetch(`${API_BASE}/users/${userId}/stats`);
  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.error || "Failed to load stats");
  }

  return data;
}

export async function loginUser({ email, user_id }) {
  const response = await fetch(`${API_BASE}/users/login`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      ...(email ? { email } : {}),
      ...(user_id ? { user_id } : {}),
    }),
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.error || "Login failed");
  }

  return data; // { user_id, name, email, class_level }
}

export async function getUserMastery(userId) {
  const response = await fetch(`${API_BASE}/users/${userId}/mastery`);

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.error || "Failed to load mastery");
  }

  return data;
}

export async function submitInteraction(payload) {
  const response = await fetch(`${API_BASE}/interactions/submit`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.error || "Failed to submit interaction");
  }

  return data; // { success, new_mastery }
}

export async function getNextProblem(userId) {
  const response = await fetch(`${API_BASE}/problems/next`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ user_id: userId }),
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.error || "Failed to load next problem");
  }

  return data;
}
