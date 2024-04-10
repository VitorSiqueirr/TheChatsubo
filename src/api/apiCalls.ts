const URL = "http://127.0.0.1:3001";

export const fetchAttendants = async () => {
  try {
    const response = await fetch(`${URL}/attendants`);
    const data = await response.json();
    return data;
  } catch (error) {
    throw new Error(error);
  }
};

export const postAttendant = async (name: string) => {
  try {
    const response = await fetch(`${URL}/attendants`, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ name }),
    });
    const data = await response.json();
    return data;
  } catch (error) {
    throw new Error(error);
  }
};

export const fetchMessages = async () => {
  try {
    const response = await fetch(`${URL}/messages`);
    const data = await response.json();
    return data;
  } catch (error) {
    throw new Error(error);
  }
};

export const postMessage = async (attendantId: number, text: string) => {
  try {
    const response = await fetch(`${URL}/attendants/${attendantId}/messages`, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ text }),
    });
    const data = await response.json();
    return data;
  } catch (error) {
    throw new Error(error);
  }
};
