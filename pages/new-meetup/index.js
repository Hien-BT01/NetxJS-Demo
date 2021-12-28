
import NewMeetupForm from "../../components/meetups/NewMeetupForm"
import Head from "next/head";
import { Fragment } from "react";
import { useRouter } from "next/router"

const NewMeetupPage = () => {
    const router = useRouter();
    const addMeetupHandler = async (meetup) => {
        await fetch("/api/new-meetup",{
            method:"POST",
            body:JSON.stringify(meetup),
            headers:{
                'Content-Type':"application/json"
            }
        })

        router.replace("/")
    }

    return (
        <Fragment>
            <Head>
                <title>Add a new Meetup</title>
                <meta name="description" content="Add your own meetups"/>
                
            </Head>
            <NewMeetupForm onAddMeetUp={addMeetupHandler} />
        </Fragment>
    )
}

export default NewMeetupPage
