const { ErrorResponse } = require("../models/ErrorResponse");
const { Workspace } = require("../models/Workspace");

const authWorkspace = async (req, res, next) => {
  if (req.session.workspaceId) {
    try {
      const workspace = await Workspace.findById(req.session.workspaceId);
      if(workspace) {
        req.workspace = workspace;
        next();
      }
    } catch (err) {
      res.status(401).json(new ErrorResponse(0, "Database error"));
    }
  }
  res.stauts(401).json(new ErrorResponse(-1, "Session expired"));
};

const authAdmin = async (req, res, next) => { 
  if (req.session.admin) {
    next();
  } else {
    res.status(401).json(new ErrorResponse(-1, "Unarthorized"));
  }
};


module.exports = {
  authWorkspace,
  authAdmin,
}