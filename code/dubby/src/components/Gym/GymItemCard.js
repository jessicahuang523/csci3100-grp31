import React, { useContext, useState, useEffect } from "react";
import { UserContext } from "../../contexts/UserContext";
import { ThemeContext } from "../../contexts/ThemeContext";
import {
  Row,
  Col,
  Card,
  CardTitle,
  CardText,
  UncontrolledCarousel,
} from "reactstrap";
import EditGymImage from "./EditGymImage";
import EditScheduleImage from "./EditScheduleImage";

const GymItemCard = ({ data }) => {
  const { userData } = useContext(UserContext);
  const { isPrimaryTheme } = useContext(ThemeContext);

  const { display, description, scheduleImageRef, id } = data;

  // parsed image data from database/props
  const [mainImage, setMainImage] = useState();
  const [scheduleImage, setScheduleImage] = useState();
  // list of images to be displayed. Contains header, caption and image src
  const [imageItems, setImageItems] = useState();

  // fetch schedule images from database and main image
  // updates mainImage and scheduleImage
  useEffect(() => {
    if (data) {
      setMainImage({
        src: data.image_main,
        header: "Welcome to",
        caption: data.display,
      });
      const unsubscribeScheduleImage = scheduleImageRef
        .orderBy("timestamp", "asc")
        .limitToLast(3)
        .onSnapshot((snap) => {
          let tmp = [];
          snap.forEach((d) => {
            const { src, timestamp } = d.data();
            tmp.push({
              src,
              header: "Is it open?",
              caption:
                "Schedule information on " +
                new Date(timestamp).toLocaleDateString(),
            });
          });
          setScheduleImage(tmp);
        });
      return () => {
        unsubscribeScheduleImage();
      };
    }
  }, [data, scheduleImageRef]);

  // mixes mainImage with scheduleImage to create list of images to be displayed
  // updates imageItems
  useEffect(() => {
    let tmp = [];
    if (mainImage) {
      tmp.push(mainImage);
    }
    if (scheduleImage && scheduleImage.length > 0) {
      tmp = [...tmp, ...scheduleImage];
    }
    setImageItems(tmp);
  }, [mainImage, scheduleImage]);

  // render
  return (
    <Card
      body
      inverse={!isPrimaryTheme}
      color={!isPrimaryTheme ? "dark" : null}
      style={{ marginBottom: "1rem" }}
    >
      <CardTitle tag="h4">{display}</CardTitle>
      <CardText>{description}</CardText>
      {imageItems && <UncontrolledCarousel items={imageItems} />}
      <hr />
      {/* displays upload component only when authorized */}
      {userData && (
        <Row xs="1" sm="2">
          <Col>
            <EditGymImage id={id} />
          </Col>
          <Col>
            <EditScheduleImage id={id} />
          </Col>
        </Row>
      )}
    </Card>
  );
};

export default GymItemCard;
