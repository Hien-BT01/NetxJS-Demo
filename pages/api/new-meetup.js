import { MongoClient } from "mongodb"

const handler = async (req, res) => {
    if(req.method === "POST"){
        const data = req.body

        const client = await MongoClient.connect('mongodb+srv://hienbui:0123456789@cluster0.n7pyv.mongodb.net/meetups?retryWrites=true&w=majority')

        const database = client.db();
        
        const meetupsCollection = database.collection('meetups')
        await meetupsCollection.insertOne(data)

        client.close();

        res.status(201).json({message:"Meetup inserted"})

    }
}


export default handler