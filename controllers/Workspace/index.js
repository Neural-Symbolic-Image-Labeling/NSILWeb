const router = require('express').Router();
const { ErrorResponse } = require('../../models/ErrorResponse');
const { ImageSet } = require('../../models/Image');
const { Workspace } = require('../../models/Workspace');
const { authWorkspace } = require('../../utils');
const { createWorkspace, collectionBuilder, requestLabel } = require('./manager');

const getPath = (path) => `/workspace${path}`;

router.post(getPath('/login'), async (req, res) => {
  if (req.body) {
    /**@type {import('./request').LoginRequest} */
    const reqBody = req.body;
    const workspace = await Workspace.findOne({ name: reqBody.workspaceName });
    if (workspace) {
      req.session.workspaceId = workspace._id;
      res.status(200).json(workspace);
    } else {
      // create a new workspace
      try {
        const nws = await createWorkspace(reqBody.workspaceName);
        const ws = new Workspace(nws);
        const result = await ws.save();
        req.session.workspaceId = result._id;
        res.status(200).json(result);
      } catch (err) {
        res.status(500).json(new ErrorResponse(0, "Failed to create workspace", err));
      };
    }
    return;
  }
  res.status(400).json(new ErrorResponse(2, "request body is required"));
});

router.get(getPath('/auto'), authWorkspace, (req, res) => {
  res.status(200).json(req.workspace);
});

router.post(getPath('/collection'), async (req, res) => {
  if (req.body) {
    /**@type {import('./request').NewCollectionRequest} */
    const reqBody = req.body;
    try {
      const workspaceDoc = await Workspace.findById(reqBody.workspaceId);
      const imgSetDoc = await ImageSet.findOne({ name: reqBody.setName }).lean();

      const newCollection = collectionBuilder(imgSetDoc);
      workspaceDoc.collections.push(newCollection);
      const result = await workspaceDoc.save();
      res.status(200).json(result.collections.find(c => c.name === reqBody.setName)._id.toString());
      return;
    } catch (err) {
      res.status(500).json(new ErrorResponse(0, "Failed to add collection", err));
      return;
    }
  }
  res.status(400).json(new ErrorResponse(2, "request body is required"));
});

router.post(getPath('/label'), async (req, res) => {
  if (req.body) {
    /**@type {import('./request').AutoLabelRequest} */
    const reqBody = req.body;
    try {
      const result = await requestLabel(reqBody.workspaceId, reqBody.collectionId, reqBody.task);
      res.status(200).json(result);
      return;
    } catch (err) {
      console.log(err);
      res.status(500).json(new ErrorResponse(0, "Failed to request foil", err));
      return;
    }
  } else {
    res.status(400).json(new ErrorResponse(2, "request body is required"));
    return; 
  }
});

router.post(getPath('/savelabelstatus'), authWorkspace, async (req, res) => { 
  if (req.body) {
    /**@type {import('./request').SaveLabelStatusRequest} */
    const reqBody = req.body;
    try { 
      // find the collection
      const collection = req.workspace.collections.find(c => c._id.toString() === reqBody.collectionId);
      if (!collection) {
        res.status(404).json(new ErrorResponse(0, "Collection not found"));
        return;
      }
      // find the image
      const image = collection.images.find(i => i.imageId.toString() === reqBody.imageId);
      if (!image) {
        res.status(404).json(new ErrorResponse(0, "Image not found"));
        return;
      }
      // update labels
      image.labels = reqBody.labels;
      await req.workspace.save();
      res.status(200).json({ message: "success" });
      return;
    }catch(err) {
      res.status(500).json(new ErrorResponse(0, "Failed to save label status", err));
      return;
    }
  } else {
    res.status(400).json(new ErrorResponse(2, "request body is required"));
    return;
  }
});

router.post(getPath('/updaterules'), authWorkspace, async (req, res) => { 
  if (req.body) { 
    /**@type {import('./request').UpdateRuleRequest} */
    const reqBody = req.body;
    const collection = req.workspace.collections.find(c => c._id.toString() === reqBody.collectionId);
    if (!collection) { 
      res.status(404).json(new ErrorResponse(0, "Collection not found"));
      return;
    }
    collection.rules = reqBody.rules;
    try {
      await req.workspace.save();
      res.status(200).json({ message: "success" });
      return;
    } catch (err) {
      res.status(500).json(new ErrorResponse(0, "Failed to update rule", err));
      return;
    }
  } else {
    res.status(400).json(new ErrorResponse(2, "request body is required"));
    return;
  }
});

router.post(getPath('/updateLabels'), authWorkspace, async (req, res) => { 
  if (req.body) {
    /**@type {import('./request').UpdateLabelsRequest} */
    const reqBody = req.body;
    try { 
      if (!reqBody.label) {
        res.status(200).json({ message: "no change" });
        return;
      }
      // find the collection
      const collection = req.workspace.collections.find(c => c._id.toString() === reqBody.collectionId);
      if (!collection) {
        res.status(404).json(new ErrorResponse(0, "Collection not found"));
        return;
      }
      if (!reqBody.label) {
        collection.images[reqBody.imageIndex].labels = [];
        res.status(200).json({ message: "success" });
        return;
      }
      // update labels
      collection.images[reqBody.imageIndex].labels = [...reqBody.label];
      await req.workspace.save();
      res.status(200).json({ message: "success" });
      return;
    }catch(err) {
      res.status(500).json(new ErrorResponse(0, "Failed to update label", err));
      return;
    }
  } else {
    res.status(400).json(new ErrorResponse(2, "request body is required"));
    return;
  }
});
module.exports = { router }