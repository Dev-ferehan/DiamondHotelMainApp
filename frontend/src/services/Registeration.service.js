export const registerCustomer = async (formData) => {
  try {
    const url = "http://localhost:8000/api/admin/register";
    const reqOptions = {
      method: "POST",
      body: JSON.stringify(formData),
      headers: {
        "Content-Type": "application/json",
      },
    };
    return fetch(url, reqOptions)
      .then((res) => res.json())
      .then((data) => data)
      .catch((err) => err);
  } catch (error) {
    console.error("Registeration error:", error);
    throw error;
  }
};