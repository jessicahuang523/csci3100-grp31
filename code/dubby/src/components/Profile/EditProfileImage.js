import React, { useState } from "react";
import { Input, Button, Progress } from "reactstrap";
import { uploadProfileImage } from "../../utilityfunctions/Utilities";

const EditProfileImage = () => {
  const [imageFile, setImageFile] = useState();
  const [uploadProgress, setUploadProgress] = useState();

  const handleProfileImageInputChange = (e) => setImageFile(e.target.files[0]);

  const handleProfileImageUpload = (e) => {
    e.preventDefault();
    uploadProfileImage({ imageFile, setUploadProgress });
  };

  return (
    <div>
      <h2>Profile Image</h2>
      <Input
        accept="image/x-png,image/gif,image/jpeg"
        type="file"
        onChange={handleProfileImageInputChange}
      />
      <Button block size="sm" color="info" onClick={handleProfileImageUpload}>
        Upload
      </Button>
      {uploadProgress && <Progress value={uploadProgress} />}
    </div>
  );
};

export default EditProfileImage;
