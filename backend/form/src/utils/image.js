var fs = require("fs");

module.exports.imageSaver = (nombre, ext, tipo, buffer) => {
  try {
    var base64Data = buffer.split(",")[1];
    const nombreFile = `/public/${tipo}/${nombre}.${ext}`;
    fs.writeFile(
      process.cwd() + nombreFile,
      base64Data,
      "base64",
      function (err) {
        if (err) console.log(err);
      }
    );
    return `/${tipo}/${nombre}.${ext}`;
  } catch (error) {
    console.log(error);
  }
};
