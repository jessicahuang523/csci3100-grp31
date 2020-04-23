import React, { useState, useEffect } from "react";
import { Button, Input, Form, FormGroup, Label, Progress } from "reactstrap";
import { uploadGymImage } from "../../utilityfunctions/Utilities";

const EditGymImage = ({ id }) => {
  // file object to be uploaded
  const [imageFile, setImageFile] = useState();
  // 0~100, will be updated by uploadGymImage()
  const [uploadProgress, setUploadProgress] = useState(0);

  // reset when progress >= 100 and removes input image
  useEffect(() => {
    if (uploadProgress >= 100) {
      alert("Upload complete!");
      setImageFile(null);
      setUploadProgress(0);
    }
  }, [uploadProgress]);

  const handleImageInputChange = (e) => setImageFile(e.target.files[0]);

  // invokes uploadGymImage() to upload image if present
  const handleUploadImage = async (e) => {
    e.preventDefault();
    if (imageFile) {
      uploadGymImage({ imageFile, setUploadProgress, id });
    }
  };

  // render
  return (
    <Form onSubmit={handleUploadImage}>
      <FormGroup>
        <Label for="main-image">Update gym image?</Label>
        <Input
          id="main-image"
          type="file"
          accept="image/x-png,image/gif,image/jpeg"
          onChange={handleImageInputChange}
        />
      </FormGroup>
      <Button block color="secondary" size="sm" type="submit">
        <i className="fas fa-upload"></i> Upload
      </Button>
      <Progress color="success" value={uploadProgress} />
    </Form>
  );
};

export default EditGymImage;
