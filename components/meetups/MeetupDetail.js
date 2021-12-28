import classes from "./MeetupDetail.module.css";
import Image from "next/image";
import Card from "../ui/Card";
const MeetupDetail = (props) => {
  return (
    <Card>
      <section className={classes.detail}>
        <div className={classes.image}>
          <Image src={props.image} alt={props.title} layout="fill" />
        </div>
        <h1>{props.title}</h1>
        <address>{props.address}</address>
        <p>{props.description}</p>
      </section>
    </Card>
  );
};

export default MeetupDetail;
