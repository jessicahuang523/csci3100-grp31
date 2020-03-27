import React, { useState } from "react";
import { Input, Button, Progress } from "reactstrap";
import { uploadProfileImage } from "../../utilityfunctions/Utilities";

const EditProfileImage = () => {
  const [imageFile, setImageFile] = useState();
  const [uploadProgress, setUploadProgress] = useState(0);

  const handleProfileImageInputChange = e => setImageFile(e.target.files[0]);

  const handleProfileImageUpload = e => {
    e.preventDefault();
    uploadProfileImage({ imageFile, setUploadProgress });
  };

  return (
    <div>
      <Input
        accept="image/x-png,image/gif,image/jpeg"
        type="file"
        onChange={handleProfileImageInputChange}
      />
      <Progress value={uploadProgress} />
      <Button block color="primary" onClick={handleProfileImageUpload}>
        Upload
      </Button>
    </div>
  );
};

export default EditProfileImage;
