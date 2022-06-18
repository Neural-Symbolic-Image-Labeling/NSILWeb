const router = require('express').Router();
const { ErrorResponse } = require('../../models/ErrorResponse');
const { Workspace } = require('../../models/Workspace');
const { authWorkspace } = require('../../utils');
const { createWorkspace } = require('./manager');

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

router.get(getPath('/'), authWorkspace, (req, res) => { 
   
}); 

module.exports = { router }