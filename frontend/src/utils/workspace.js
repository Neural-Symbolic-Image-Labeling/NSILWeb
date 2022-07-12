import { login } from "../apis/workspace";

export const findCollection = (workspace, collectionId) => {
  if (!workspace || !collectionId) return null;
  return workspace.collections.find(c => c._id.toString() === collectionId.toString());
}