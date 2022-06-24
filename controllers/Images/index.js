const router = require('express').Router();
const { ErrorResponse } = require('../../models/ErrorResponse');
const { ImageSet } = require('../../models/Image');
const { authAdmin, uuidValidator } = require('../../utils');

const getPath = (path) => `/img${path}`;

router.get(getPath("/auto"), authAdmin, async (req, res) => { 
  res.json({ message: "success" });
});

router.get(getPath("/setNames"), async (req, res) => { 
  try{
    const sets = await ImageSet.find({}).lean();
    /**@type {import("./response").AllSetNamesResponse} */
    const setNames = sets.map(set => set.name);
    res.status(200).json(setNames);
    return;
  } catch (err) { 
    res.status(500).json(new ErrorResponse(0, "Database Error", err));
  }
});

router.post(getPath("/set"), authAdmin, async (req, res) => { 
  if (req.body) {
    /**@type {import("./request").CreateNewSetRequest} */
    const reqBody = req.body;
    const set = new ImageSet({
      name: reqBody.name,
      images: [],
    });
    try { 
      await set.save();
      res.status(200).json({ message: "success" });
      return;
    }catch (err) { 
      res.status(500).json(new ErrorResponse(0, "Database Error", err));
      return;
    }
  }
  res.status(400).json(new ErrorResponse(2, "Invalid Request", "No body provided"));
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
    const reqBody = req.body;
    // find image set first
    const imgSet = await ImageSet.findOne({ name: reqBody.setName });
    if (!imgSet) { 
      res.status(404).json(new ErrorResponse(-1, "Image set not found"));
      return;
    }
    // create image data
    const image = {
      name: reqBody.name,
      data: reqBody.data,
      interpretation: [], // TODO: process image by image detection model
    };
    try {
      // add image to image set
      imgSet.images.push(image);
      await imgSet.save();
      res.status(200).send({ message: "success" });
    } catch (err) {
      res.status(500).send(new ErrorResponse(0, "Failed to save image", err));
    }
    return;
  }
  res.status(400).send(new ErrorResponse(2, "Request body is missing"));
  return;
});

router.get(getPath("/:imgSet/:uuid"), uuidValidator, async (req, res) => { 
  let { imgSet, uuid } = req.params;
  imgSet = decodeURIComponent(imgSet);
  const imgSetData = await ImageSet.find({ name: imgSet }).lean();
  if (imgSetData) { 
    let img = imgSetData.images.find(img => img._id.toString() === uuid);
    const temp = imgRaw.data.split(",");
    let ext = temp[0].split(";")[0].split("/")[1];
    img = Buffer.from(temp[1], 'base64');
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