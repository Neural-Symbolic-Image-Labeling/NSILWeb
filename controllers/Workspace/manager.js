const { ImageSet } = require('../../models/Image');

const imageUrlParser = (imgSetName, uuid) => { 
  const encodedImgSetName = encodeURIComponent(imgSetName);
  return `${(process.env.REACT_APP_API_URL || "http://localhost:8888/api")}/img/${encodedImgSetName}/${uuid}`;

};

/** Create a new workspace 
 * @param {string} name 
 * @returns {Promise<import('../../models/Workspace').IWorkspaceSchema>}
 */
const createWorkspace = async (name) => { 
  const data = await ImageSet.findOne({}).lean();
  /**@type {import('../../models/Workspace/response').IImageMetaDataResponse[]} */
  const images = data.images.map((img, index) => {
    return {
      imageId: img._id.toString(),
      url: imageUrlParser(data.name, img._id),
      name: `No. ${index}`,
      label: [],
      canvas: null,
      manual: false,
    }
  });
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