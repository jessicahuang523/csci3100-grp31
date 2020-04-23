import React, { useContext, useState, useEffect } from "react";
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
import { UserContext } from "../../contexts/UserContext";

const GymItemCard = ({ data }) => {
  const { userData } = useContext(UserContext);
  const { display, description, scheduleImageRef, id } = data;

  const [mainImage, setMainImage] = useState();
  const [scheduleImage, setScheduleImage] = useState();
  const [imageItems, setImageItems] = useState();

  useEffect(() => {
    if (data) {
      setMainImage({ src: data.image_main, caption: data.display });
      scheduleImageRef
        .orderBy("timestamp", "desc")
        .limitToLast(3)
        .get()
        .then((snap) => {
          let tmp = [];
          snap.forEach((d) => {
            const { src, timestamp } = d.data();
            tmp.push({
              src,
              caption: new Date(timestamp).toLocaleDateString(),
            });
          });
          setScheduleImage(tmp);
        });
    }
  }, [data, scheduleImageRef]);

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

  return (
    <Card body style={{ marginBottom: "1rem" }}>
      <CardTitle tag="h4">{display}</CardTitle>
      <CardText>{description}</CardText>
      {imageItems && <UncontrolledCarousel items={imageItems} />}
      <hr />
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
