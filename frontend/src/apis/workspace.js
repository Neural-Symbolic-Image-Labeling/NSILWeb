import { get, post } from "./axios";

export const autoLogin = async () => { 
  return get("/workspace/auto");
}

export const login = async (name) => { 
  return post("/workspace/login", { workspaceName: name });
}

export const requestNewCollection = (setName, workspaceId) => { 
  return post("/workspace/collection", { setName: setName, workspaceId: workspaceId });
}