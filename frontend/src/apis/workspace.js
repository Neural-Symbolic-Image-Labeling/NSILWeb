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

export const updateRules = (collectionId, rulesData) => { 
  return post("/workspace/updaterules", { collectionId: collectionId, rules: rulesData });
}

export const updateImageMetaData = (collectionId, indexI, imgData) => { 
  return post("/workspace/updateImageMetaData", {
    collectionId: collectionId,
    indexI: indexI,
    data: imgData
  })
}

export const updateStatistics = (collectionId, statisticsData) => { 
  return post("/workspace/updateStatistics", {
    collectionId: collectionId,
    data: statisticsData
  });
}

export const updateMode = (collectionId, mode) => { 
  return post("/workspace/updateMode", {
    collectionId: collectionId,
    mode: mode
  });
}