const { default: mongoose } = require('mongoose');
const { ImageSet } = require('../../models/Image');
const { get, post } = require('../../utils/http');

const imageUrlParser = (uuid) => { 
  return `${(process.env.REACT_APP_API_URL || "http://localhost:8888/api")}/img/${uuid}`;

};

const collectionBuilder = (imgSetDoc) => {
  const images = imgSetDoc ? imgSetDoc.images.map((imgId, index) => { 
    return {
      imageId: imgId.toString(),
      url: imageUrlParser(imgId.toString()),
      name: `${index}.PNG`,
      labels: [],
      labeled: false,
      manual: false,
    }
  }) : [];
  const collection = {
    name: imgSetDoc.name,
    statistics: {
      total: images.length,
      unlabeled: images.length,
      manual: 0,
      autoLabeled: 0,
    },
    images: images,
    rules: []
  };
  return collection;
}

/** Create a new workspace 
 * @param {string} name 
 * @returns {Promise<import('../../models/Workspace').IWorkspaceSchema>}
 */
const createWorkspace = async (name) => { 
  const data = await ImageSet.findOne({});
  const collection = collectionBuilder(data);
  const result = {
    name: name,
    collections: [],
  }
  result.collections.push(collection);
  return result;
}

const requestFoil = async (workspaceId, collectionId) => { 
  const reqBody = {
    workspaceID: workspaceId,
    collectionID: collectionId,
  }
  return post(`/autolabel`, reqBody);
}

module.exports = {
  createWorkspace,
  collectionBuilder,
  requestFoil
}