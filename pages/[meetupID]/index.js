import { MongoClient, ObjectId } from "mongodb";
import MeetupDetail from "../../components/meetups/MeetupDetail";
import Head from "next/head";
import { Fragment } from "react";
const MeetupDetails = (props) => {
  return (
    <Fragment>
      <Head>
        <title>{props.meetupData.title}</title>
        <meta name="description" content={props.meetupData.description}/>
      </Head>
      <MeetupDetail
        image={props.meetupData.image}
        title={props.meetupData.title}
        address={props.meetupData.address}
        description={props.meetupData.description}
      />
    </Fragment>
  );
};

export async function getStaticPaths() {
  const client = await MongoClient.connect(
    "mongodb+srv://hienbui:0123456789@cluster0.n7pyv.mongodb.net/meetups?retryWrites=true&w=majority"
  );

  const database = client.db();

  const meetupsCollection = database.collection("meetups");

  const meetupsID = await meetupsCollection.find({}, { _id: 1 }).toArray();

  return {
    paths: meetupsID.map((meetup) => ({
      params: {
        meetupID: meetup._id.toString(),
      },
    })),
    fallback: false,
  };
}

export async function getStaticProps(context) {
  const meetupID = context.params.meetupID;

  const client = await MongoClient.connect(
    "mongodb+srv://hienbui:0123456789@cluster0.n7pyv.mongodb.net/meetups?retryWrites=true&w=majority"
  );

  const database = client.db();

  const meetupsCollection = database.collection("meetups");

  const meetup = await meetupsCollection.findOne({
    _id: ObjectId(meetupID),
  });

  console.log(context);
  return {
    props: {
      meetupData: {
        id: meetup._id.toString(),
        title: meetup.title,
        image: meetup.image,
        address: meetup.address,
        description: meetup.description,
      },
    },
  };
}

export default MeetupDetails;
