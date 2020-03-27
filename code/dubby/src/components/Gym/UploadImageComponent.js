import React, { useEffect, useState } from "react";
import { Button, Input, Form, Media } from "reactstrap";
import { storage } from "firebase";

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

  const addImage = e => {
    const newImage = e.target.files[0];
    if (newImage) {
      setImage(newImage);
    }
  };

  return (
    <div>
      <Form onSubmit={uploadImage}>
        <Input
          type="file"
          accept="image/x-png,image/gif,image/jpeg"
          onChange={addImage}
        />
        <Button color="primary" type="submit" onClick={uploadImage}>
          Upload
        </Button>
      </Form>
      {url ? (
        <Media src={url} alt={imageName} style={{ width: "10rem" }} />
      ) : null}
    </div>
  );
};

export default UploadImageComponent;
