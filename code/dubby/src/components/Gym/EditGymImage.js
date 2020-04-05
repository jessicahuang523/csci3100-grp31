import React, { useEffect, useState } from "react";
import { storage } from "firebase";
import { Button, Input, Form, Media } from "reactstrap";

const EditGymImage = ({ image_main }) => {
  const [image, setImage] = useState(null);
  const [url, setUrl] = useState(false);

  useEffect(() => {
    const fetchImage = async () => {
      try {
        const result = await storage().ref(image_main).getDownloadURL();
        setUrl(result);
      } catch (e) {}
    };
    fetchImage();
  }, [image_main]);

  const handleUploadImage = async (e) => {
    e.preventDefault();
    if (image) {
      const progress = () => {};
      const error = () => {};
      const complete = async () => {
        const urlResponse = await storage().ref(image_main).getDownloadURL();
        console.log(urlResponse);
        setUrl(urlResponse);
      };
      const uploadTask = storage().ref(image_main).put(image);
      uploadTask.on("state_changed", progress, error, complete);
    }
  };

  const handleImageInputChange = (e) => {
    const newImage = e.target.files[0];
    if (newImage) {
      setImage(newImage);
    }
  };

  return (
    <div>
      <Form onSubmit={handleUploadImage}>
        <Input
          type="file"
          accept="image/x-png,image/gif,image/jpeg"
          onChange={handleImageInputChange}
        />
        <Button color="primary" type="submit">
          Upload
        </Button>
      </Form>
      {url ? (
        <Media src={url} alt={image_main} style={{ width: "10rem" }} />
      ) : null}
    </div>
  );
};

export default EditGymImage;
