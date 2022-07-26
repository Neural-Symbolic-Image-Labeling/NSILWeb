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

export const requestAutoLabel = (workspaceId, collectionId) => { 
  return post("/workspace/label", { workspaceId: workspaceId, collectionId: collectionId, task: "auto" });
}

export const requestTrailLabel = (workspaceId, collectionId) => {
  return post("/workspace/label", { workspaceId: workspaceId, collectionId: collectionId, task: "trail" });
};

export const saveLabelStatus = (collectionId, imageId, labelData) => { 
  return post("/workspace/savelabelstatus", { collectionId: collectionId, imageId: imageId, labelData: labelData });
}

export const updateRules = (collectionId, rulesData) => { 
  return post("/workspace/updaterules", { collectionId: collectionId, rules: rulesData });
}

export const updateLabels = (collectionId, imageIndex, labelData) => { 
  return post("/workspace/updateLabels", { collectionId: collectionId, imageIndex: imageIndex, label: labelData});
}
