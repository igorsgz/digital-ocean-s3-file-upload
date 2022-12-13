exports.uploadFile = async (req, res) => {
  let fileArray = req.files,
    fileLocation;

  const images = [];

  for (let i = 0; i < fileArray.length; i++) {
    fileLocation = fileArray[i].location;
    images.push(fileLocation);
  }

  return res.status(200).json({
    message: "Arquivos enviados com sucesso",
    filesArray: fileArray,
    locationArray: images,
  });
};
