const API_URL =
  process.env.NEXT_PUBLIC_API_URL ||
  "https://food-hub-backend-one.vercel.app";
  

interface FetchOptions {
  method?: "GET" | "POST" | "PUT" | "PATCH" | "DELETE";
  body?: any;
  cache?: RequestCache;
  revalidate?: number;
}

interface ServiceResponse<T> {
  data: T | null;
  error: string | null;
}

async function apiFetch<T>(
  endpoint: string,
  options?: FetchOptions
): Promise<ServiceResponse<T>> {
  try {
    const config: RequestInit = {
      method: options?.method || "GET",
      credentials: "include", // ✅ REQUIRED for auth cookies
      headers: {
        "Content-Type": "application/json",
      },
    };

    if (options?.body) {
      config.body = JSON.stringify(options.body);
    }

    if (options?.cache) {
      config.cache = options.cache;
    }

    if (options?.revalidate) {
      config.next = { revalidate: options.revalidate } as any;
    }

    const url = endpoint.startsWith("http")
      ? endpoint
      : `${API_URL}${endpoint}`;

    const res = await fetch(url, config);

    const contentType = res.headers.get("content-type");
    const isJson = contentType?.includes("application/json");

    let json: any;

    try {
      json = isJson ? await res.json() : await res.text();
    } catch (err) {
      console.error("JSON parse error:", err);
      return { data: null, error: "Invalid server response" };
    }

    // ❌ handle HTTP errors
    if (!res.ok) {
      return {
        data: null,
        error:
          json?.message ||
          json?.error ||
          `Request failed (${res.status})`,
      };
    }

    // ✅ handle multiple response formats safely
    return {
      data: (json?.data ?? json) as T,
      error: null,
    };
  } catch (error) {
    console.error(`API Error (${endpoint}):`, error);
    return {
      data: null,
      error: "Network error occurred",
    };
  }
}

function buildQueryString(
  params: Record<string, string | number | undefined>
): string {
  const searchParams = new URLSearchParams();

  Object.entries(params).forEach(([key, value]) => {
    if (value !== undefined && value !== null && value !== "") {
      searchParams.append(key, String(value));
    }
  });

  const query = searchParams.toString();
  return query ? `?${query}` : "";
}

export { apiFetch, buildQueryString, API_URL };
export type { FetchOptions, ServiceResponse };