const routes = require("express").Router();
const multer = require("multer");
const multerConfig = require("./config/multer");
const { removeFile } = require("./controller/removeFile");
const { uploadFile } = require("./controller/uploadFile");

routes.post(
  "/upload/folder/:folderName",
  multer(multerConfig).array("files"),
  uploadFile
);
routes.post("/upload", multer(multerConfig).array("files"), uploadFile);

routes.delete("/posts/:key", async (req, res) => {
  try {
    await removeFile(req.params.key);

    return res.json({ message: "Arquivo deletado com sucesso" });
  } catch (error) {
    return res.status(500).json({ error, message: "Erro ao deletar arquivo" });
  }
});

module.exports = routes;
