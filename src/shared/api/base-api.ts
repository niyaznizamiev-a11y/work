export const baseApi = {
  baseURL: 'http://localhost:5000/api',
  
  async request<T>(url: string, options: RequestInit = {}): Promise<T> {
    const response = await fetch(`${this.baseURL}${url}`, {
      headers: {
        'Content-Type': 'application/json',
        ...options.headers,
      },
      ...options,
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    return response.json() as Promise<T>;
  },
};