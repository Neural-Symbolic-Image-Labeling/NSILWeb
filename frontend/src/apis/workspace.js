import { get, post } from "./axios";

export const autoLogin = async () => { 
  return get("/workspace/auto");
}

export const login = async (name) => { 
  return post("/workspace/login", { workspaceName: name });
}