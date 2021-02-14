import express from "express";
import vision from "@google-cloud/vision";
import multer from "multer";

// Creates a client
const upload = multer({ dest: "./upload" });
const client = new vision.ImageAnnotatorClient();
const server = express();

server.post("/", upload.single("image"), async (req, res) => {
  const [result] = await client.labelDetection("./" + req.file.filename);
  const labels = result.labelAnnotations;
  res.json({ ...labels });
});

const port = process.env.PORT || 8000;
server.listen(port, () => {
  console.log("listening on http://localhost:" + port);
});
