import api from "@/lib/axios";

export type RegisterLoginPayload = {
  email: string;
  password: string;
};

export async function registerApi(payload: RegisterLoginPayload) {
  const response = await api.post("/api/Auth/register", payload);
  return response.data;
}

export async function loginApi(payload: RegisterLoginPayload) {
  const response = await api.post("/api/Auth/login", payload);
  return response.data;
}
