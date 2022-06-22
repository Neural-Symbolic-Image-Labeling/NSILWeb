const router = require('express').Router();
const { ErrorResponse } = require('../../models/ErrorResponse');
const { Image } = require('../../models/Image');
const { authAdmin, uuidValidator } = require('../../utils');

const getPath = (path) => `/img${path}`;

router.get(getPath("/auto"), authAdmin, async (req, res) => { 
  res.json({ message: "success" });
});

router.post(getPath('/auth'), async (req, res) => {
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
  return;
});

router.get(getPath("/:uuid"), uuidValidator, async (req, res) => { 
  const uuid = req.params.uuid;
  const imgRaw = await Image.findById(uuid);
  if (imgRaw) { 
    const temp = imgRaw.data.split(",");
    let ext = temp[0].split(";")[0].split("/")[1];
    const img = Buffer.from(temp[1], 'base64');
    res.writeHead(200, {
      'Content-Type': `image/${ext}`,
      'Content-Length': img.length,
    });
    res.end(img);
    return;
  }
  res.status(404).send(new ErrorResponse(-1, "Image not found"));
});

router.delete(getPath('/all'), authAdmin, async (req, res) => { 
  try {
    await Image.deleteMany({});
    res.status(200).send({ message: "success" });
    return;
  } catch (err) { 
    res.status(500).send(new ErrorResponse(0, "Failed to delete images", err));
    return;
  }
});

module.exports = { router }