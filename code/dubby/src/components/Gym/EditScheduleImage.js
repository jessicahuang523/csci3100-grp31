import React, { useState } from "react";
import { Input, Button, Form, FormGroup, Label, Progress } from "reactstrap";
import { uploadGymScheduleImage } from "../../utilityfunctions/Utilities";

const EditScheduleImage = ({ id }) => {
  const [imageFile, setImageFile] = useState();
  const [uploadProgress, setUploadProgress] = useState();

  const handleUploadImage = async (e) => {
    e.preventDefault();
    if (imageFile) {
      uploadGymScheduleImage({ imageFile, setUploadProgress, id });
    }
  };

  const handleImageInputChange = (e) => {
    const newImage = e.target.files[0];
    if (newImage) {
      setImageFile(newImage);
    }
  };

  return (
    <Form onSubmit={handleUploadImage}>
      <FormGroup>
        <Label for="schedule-image">Update schedule?</Label>
        <Input
          id="schedule-image"
          type="file"
          accept="image/x-png,image/gif,image/jpeg"
          onChange={handleImageInputChange}
        />
      </FormGroup>
      <Button block color="info" size="sm" type="submit">
        <i className="fas fa-upload"></i> Upload
      </Button>
      <br />
      {uploadProgress && <Progress color="info" value={uploadProgress} />}
    </Form>
  );
};

export default EditScheduleImage;
