import { autoLogin } from "../apis/workspace";

export const findCollection = (workspace, collectionId) => {
  if (!workspace || !collectionId) return null;
  return workspace.collections.find(c => c._id.toString() === collectionId.toString());
}

export const pullWorkspace = (workspaceId, updator) => {
  return new Promise((resolve, reject) => {
    autoLogin()
      .then(res => {
        if (res) {
          updator(res);
          resolve(res);
          return;
        } else {
          reject("cannot get new data");
          return;
        }
      }).catch(err => {
        reject(err);
        return;
      });
  });
}