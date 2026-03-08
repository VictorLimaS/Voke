const API_URL = import.meta.env.VITE_API_URL 

export const loginUser = async (email: string, password: string) => {
  const response = await fetch(`${API_URL}/api/auth/login`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({ email, password })
  });

  if (!response.ok) {
    throw new Error("Credenciais inválidas");
  }

  return response.json();
};

export const registerUser = async (
  name: string,
  email: string,
  password: string
) => {
  const response = await fetch(`${API_URL}/api/users`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({ name, email, password })
  });

  if (!response.ok) {
    throw new Error("Erro ao criar conta");
  }

  return response.json();
};