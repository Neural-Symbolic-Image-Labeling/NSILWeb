const router = require('express').Router();
const { ErrorResponse } = require('../../models/ErrorResponse');
const { Image } = require('../../models/Image');
const { authAdmin } = require('../../utils');

const getPath = (path) => `/img${path}`;

router.get(getPath('/auth'), async (req, res) => {
  if (req.body) {
    /**@type {import('./request').AuthRequest} */
    const reqBody = req.body;
    if (reqBody.token === (process.env.authToken || 'admin')) {
      req.session.admin = true;
      res.status(200).json({ message: "success" });
      return;
    }
    else {
      res.status(401).json(new ErrorResponse(-1, "Invalid token"));
      return;
    }
  }
  res.status(400).send(new ErrorResponse(2, "Request body is missing"));
});

router.post(getPath('/'), authAdmin, async (req, res) => {
  if (req.body) {
    /**@type {import('./request').ImageUploadRequest} */
    const imageData = req.body;
    const image = new Image({
      name: imageData.name,
      data: imageData.data,
    });
    try {
      await image.save();
      res.status(200).send({ message: "success" });
    } catch (err) {
      res.status(500).send(new ErrorResponse(0, "Failed to save image", err));
    }
    return;
  }
  res.status(400).send(new ErrorResponse(2, "Request body is missing"));
});

module.exports = { router }