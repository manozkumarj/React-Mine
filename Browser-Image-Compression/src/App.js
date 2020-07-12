import React, { useState } from "react";
import "./App.css";
import imageCompression from "browser-image-compression";

const App = () => {
  const [maxSizeMB, setMaxSizeMB] = useState(1);
  const [maxWidthOrHeight, setMaxWidthOrHeight] = useState(1024);
  const [progress, setProgress] = useState(null);
  const [files, setFiles] = useState([]);

  const onProgress = (p, useWebWorker) => {
    const targetName = useWebWorker;
    setProgress(p);
  };

  const compressImage = async (event, useWebWorker) => {
    console.clear();
    const allFiles = event.target.files;

    console.log(allFiles);

    let tempFileObjectArray = [];
    let singleFileObject;

    for (let i = 0; i < allFiles.length; i++) {
      const file = allFiles[i];
      console.log("input", file);

      singleFileObject = {};

      let fileSource = file;
      let fileName = fileSource.name;
      let splitFileName = fileName.split(".");
      let extension = splitFileName[splitFileName.length - 1];

      console.log("extension --> " + extension);

      if (extension === "webp") {
        extension = "jpg";
      }

      console.log(
        "ExifOrientation",
        await imageCompression.getExifOrientation(file)
      );
      const targetName = useWebWorker;

      singleFileObject.inputSize = (file.size / 1024 / 1024).toFixed(2);
      singleFileObject.inputUrl = URL.createObjectURL(file);

      var options = {
        maxSizeMB: maxSizeMB,
        maxWidthOrHeight: maxWidthOrHeight,
        useWebWorker,
        onProgress: (p) => onProgress(p, useWebWorker),
        fileType: extension,
      };
      const output = await imageCompression(file, options);
      console.log("output", output);

      singleFileObject.outputSize = (output.size / 1024 / 1024).toFixed(2);
      singleFileObject.outputUrl = URL.createObjectURL(output);

      tempFileObjectArray.push(singleFileObject);
    }
    setFiles([...files, ...tempFileObjectArray]);
  };

  return (
    <div className="App">
      <div>
        <label htmlFor="main-thread">
          Compress in main-thread --
          {progress && <span>{progress} %</span>}
          <input
            id="main-thread"
            type="file"
            multiple
            accept="image/jpeg, image/png, image/jpg, image/webp"
            onChange={(e) => compressImage(e, "mainThread")}
          />
        </label>
      </div>
      {files &&
        files.length > 0 &&
        files.map((file) => (
          <div key={file.inputUrl}>
            <p>
              {file.inputSize && (
                <span>Source image size: {file.inputSize} mb</span>
              )}
              {file.outputSize && (
                <span> **** Output image size: {file.outputSize}</span>
              )}
            </p>
            <table>
              <thead>
                <tr>
                  <td>input preview</td>
                  <td>output preview</td>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>
                    <img src={file.inputUrl} alt="input" />
                  </td>
                  <td>
                    <img src={file.outputUrl} alt="output" />
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        ))}
    </div>
  );
};

export default App;
