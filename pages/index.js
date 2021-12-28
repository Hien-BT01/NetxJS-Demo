import MeetupList from "../components/meetups/MeetupList";
import { MongoClient } from "mongodb";
import Head from "next/head";
import { Fragment } from "react";
const HomePage = (props) => {
  return (
    <Fragment>
      <Head>
        <title>Meetups</title>
        <meta name="description"  content="A list of high active meetups"/>
      </Head>
       <MeetupList meetups={props.meetups} />
    </Fragment>
  );
};

export async function getStaticProps() {
  const client = await MongoClient.connect(
    "mongodb+srv://hienbui:0123456789@cluster0.n7pyv.mongodb.net/meetups?retryWrites=true&w=majority"
  );

  const database = client.db();

  const meetupsCollection = database.collection("meetups");

  const meetups = await meetupsCollection.find().toArray();
  client.close()

  const formattedMeetups = meetups.map(meetup => ({
    image:meetup.image,
    title:meetup.title,
    address:meetup.address,
    description:meetup.description,
    id:meetup._id.toString()
  }))
  
  return {
    props: {
      meetups: formattedMeetups,
    },
    revalidate: 10,
  };
}

export default HomePage;
