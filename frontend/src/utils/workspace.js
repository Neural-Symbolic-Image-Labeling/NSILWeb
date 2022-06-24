export const findCollection = (workspace, collectionId) => { 
  if (!workspace) return null;
  return workspace.collections.find(c => c._id.toString() === collectionId.toString());
}