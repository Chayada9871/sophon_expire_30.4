export function getStoredUser() {
  if (typeof window === "undefined") return null;

  try {
    return JSON.parse(window.localStorage.getItem("user"));
  } catch {
    return null;
  }
}

export function saveUserSession(user) {
  if (typeof window === "undefined") return;

  window.localStorage.setItem(
    "user",
    JSON.stringify({
      id: user.id,
      username: user.username,
      name: user.full_name || user.name || user.username,
      full_name: user.full_name || user.name || user.username,
      role: user.role || "user",
      loginAt: new Date().toISOString()
    })
  );
}

export function clearUserSession() {
  if (typeof window === "undefined") return;

  window.localStorage.removeItem("user");
  window.localStorage.removeItem("role");
  window.localStorage.removeItem("session");
}
