import React, { useState } from "react";
import { Input, Button, Form, FormGroup, Label, Progress } from "reactstrap";
import { uploadGymScheduleImage } from "../../utilityfunctions/Utilities";

const EditScheduleImage = ({ id }) => {
  // file object to be uploaded
  const [imageFile, setImageFile] = useState();
  // 0~100, will be updated by uploadGymScheduleImage()
  const [uploadProgress, setUploadProgress] = useState(0);

  const handleImageInputChange = (e) => setImageFile(e.target.files[0]);

  // invokes uploadGymScheduleImage() to upload image if present
  const handleUploadImage = async (e) => {
    e.preventDefault();
    if (imageFile) {
      uploadGymScheduleImage({ imageFile, setUploadProgress, id });
    }
  };

  // render
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
      <Button block color="warning" size="sm" type="submit">
        <i className="fas fa-upload"></i> Upload
      </Button>
      <Progress color="success" value={uploadProgress} />
    </Form>
  );
};

export default EditScheduleImage;
