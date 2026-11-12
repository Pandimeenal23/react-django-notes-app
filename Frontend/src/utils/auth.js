const API_URL = "http://127.0.0.1:8000/api";

export async function fetchWithAuth(url, options = {}) {
  let access = localStorage.getItem("access");
  const refresh = localStorage.getItem("refresh");

  // First request using current access token
  let response = await fetch(url, {
    ...options,
    headers: {
      ...options.headers,
      Authorization: `Bearer ${access}`,
    },
  });

  // If access token expired
  if (response.status === 401 && refresh) {
    const refreshResponse = await fetch(`${API_URL}/token/refresh/`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        refresh,
      }),
    });

    // Refresh token valid
    if (refreshResponse.ok) {
      const data = await refreshResponse.json();

      localStorage.setItem("access", data.access);

      // Retry original request with new access token
      response = await fetch(url, {
        ...options,
        headers: {
          ...options.headers,
          Authorization: `Bearer ${data.access}`,
        },
      });

      return response;
    }

    // Refresh token also expired
    localStorage.removeItem("access");
    localStorage.removeItem("refresh");

    window.location.href = "/login";
  }

  return response;
}