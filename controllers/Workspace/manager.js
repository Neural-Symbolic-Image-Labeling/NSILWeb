const { ImageSet } = require('../../models/Image');

const imageUrlParser = (uuid) => { 
  return `${(process.env.REACT_APP_API_URL || "http://localhost:8888/api")}/img/${uuid}`;

};

/** Create a new workspace 
 * @param {string} name 
 * @returns {Promise<import('../../models/Workspace').IWorkspaceSchema>}
 */
const createWorkspace = async (name) => { 
  const data = await ImageSet.findOne({}).lean();
  /**@type {import('../../models/Workspace/response').IImageMetaDataResponse[]} */
  const images = data ? data.images.map((imgId, index) => {
    return {
      imageId: imgId.toString(),
      url: imageUrlParser(imgId.toString()),
      name: `No. ${index}`,
      label: [],
      canvas: null,
      manual: false,
    }
  }) : [];
  const collection = {
    name: data.name,
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
  const result = {
    name: name,
    collections: [],
  }
  result.collections.push(collection);
  return result;
}

module.exports = {
  createWorkspace
}