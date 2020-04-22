import React, { useState } from "react";
import { Input, Button, Progress } from "reactstrap";
import { uploadProfileImage } from "../../utilityfunctions/Utilities";

const EditProfileImage = () => {
  // file object to be uploaded
  const [imageFile, setImageFile] = useState();
  // 0~100, will be updated by uploadProfileImage()
  const [uploadProgress, setUploadProgress] = useState();

  const handleProfileImageInputChange = (e) => setImageFile(e.target.files[0]);

  // invokes uploadProfileImage() to upload imageFile if present
  const handleProfileImageUpload = (e) => {
    e.preventDefault();
    if (imageFile) {
      uploadProfileImage({ imageFile, setUploadProgress });
    }
  };

  // render
  return (
    <div>
      <h2>Profile Image</h2>
      <Input
        accept="image/x-png,image/gif,image/jpeg"
        type="file"
        onChange={handleProfileImageInputChange}
      />
      <br />
      <Button block size="sm" color="info" onClick={handleProfileImageUpload}>
        <i className="fas fa-upload"></i> Upload
      </Button>
      <br />
      {uploadProgress && <Progress color="info" value={uploadProgress} />}
    </div>
  );
};

export default EditProfileImage;
