import React, {useEffect, useState} from "react";
import {Input, Button, Form, Media} from "reactstrap";
import {storage} from "firebase";

const EditScheduleImage = ({image_main}) => {
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
        // console.log(urlResponse);
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

  return (<div style={{
      display: "relative"
    }}>
    <Form onSubmit={handleUploadImage}>
      <label htmlFor="schedule">Upload a picture and let your mates know about the new schedule:</label>
      <Input id="schedule" style={{
          margin: "15px",
          width: "300px"
        }} type="file" accept="image/x-png,image/gif,image/jpeg" onChange={handleImageInputChange}/>
      <Button color="info" block="block" size="sm" type="submit" style={{
          marginBottom: "1rem"
        }}>
        Upload
      </Button>
    </Form>
    <div style={{
        position: "inline-block"
      }}>
      {
        url
          ? (<Media src={url} alt={image_main} style={{
              width: "15rem",
              display: "inline-block",
              borderStyle: "outset"
            }}/>)
          : null
      }
    </div>
  </div>);
};

export default EditScheduleImage;
