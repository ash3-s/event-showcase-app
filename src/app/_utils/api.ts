export const GetAPIHandler = async (uri: string): Promise<Response | null> => {
  try {
    const response = await fetch(uri, {
      method: "GET",
      credentials: "include",
    });
    return response;
  } catch (error) {
    console.error("Error fetching API:", error);
    return null;
  }
};

export const PostAPIHandler = async (
  uri: string,
  body: any
): Promise<Response | null> => {
  try {
    const response = await fetch(uri, {
      method: "POST",
      credentials: "include",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body),
    });
    return response;
  } catch (error) {
    console.error("Error posting to API:", error);
    return null;
  }
};
