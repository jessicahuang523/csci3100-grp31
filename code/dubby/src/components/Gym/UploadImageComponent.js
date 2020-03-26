import React, { useEffect, useState } from "react";
import { Button } from "antd";
import { storage } from "firebase";
import "./UploadImageComponent.css";

const UploadImageComponent = ({ imageName }) => {
  const [image, setImage] = useState(null);
  const [url, setUrl] = useState(false);

  useEffect(() => {
    const fetchImage = async () => {
      try {
        const result = await storage()
          .ref(`gym_images`)
          .child(imageName)
          .getDownloadURL();
        setUrl(result);
      } catch (e) {}
    };
    fetchImage();
  }, [imageName]);

  const uploadImage = async () => {
    if (image) {
      const progress = () => {};
      const error = () => {};
      const complete = async () => {
        const urlResponse = await storage()
          .ref(`gym_images`)
          .child(imageName)
          .getDownloadURL();
        console.log(urlResponse);
        setUrl(urlResponse);
      };
      const uploadTask = storage.ref(`gym_images/${imageName}`).put(image);
      uploadTask.on("state_changed", progress, error, complete);
    }
  };

  const addImage = event => {
    const newImage = event.target.files[0];
    if (newImage && newImage) {
      setImage(newImage);
    }
  };

  return (
    <div id="uploadDiv">
      <input type="file" onChange={addImage} />
      <Button type="primary" shape="round" onClick={uploadImage}>
        Upload
      </Button>
      {url ? (
        <img className="displayImage-container" src={url} alt={imageName} />
      ) : null}
    </div>
  );
};

export default UploadImageComponent;
