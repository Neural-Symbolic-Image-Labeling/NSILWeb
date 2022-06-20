const { Image } = require('../../models/Image');

const imageUrlParser = (uuid) => { 
  return `${(process.env.REACT_APP_API_URL || "http://localhost:8888/api")}/img/${uuid}`;
};

/** Create a new workspace 
 * @param {string} name 
 * @returns {Promise<import('../../models/Workspace').IWorkspaceSchema>}
 */
const createWorkspace = async (name) => { 
  const data = await Image.find({}).lean();
  /**@type {import('../../models/Workspace/response').IImageMetaDataResponse[]} */
  const images = data.map(img => {
    return {
      imageId: img._id,
      url: imageUrlParser(img._id),
      name: img.name,
      label: "unlabeled",
      canvas: null,
      manual: false,
    }
  });
  const result = {
    name: name,
    statistics: {
      total: images.length,
      unlabeled: images.length,
      manual: 0,
      userChecked: 0,
      autoLabeled: 0,
    },
    images: images,
    rules: []
  };
  return result;
}

module.exports = {
  createWorkspace
}