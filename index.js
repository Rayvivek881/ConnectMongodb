const { MongoClient } = require('mongodb');
const URl = `mongodb+srv://vivek:eUyHIFSkmjV371K7@cluster0.erfla.mongodb.net/?retryWrites=true&w=majority`;
async function connect() {
    const client = new MongoClient( URl, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    });
    try {
        await client.connect();
        const db = client.db('nodetuts');
        console.log(`Connected to MongoDB ${db.databaseName}.............`);

        // get all the collections in monogoDB
        // const collections = await db.collections();
        // collections.forEach(element => {
        //     console.log(element.collectionName);
        // });

        const collection = db.collection('practic');

        // insertMany method
        // const insertCurser = await collection.insertMany([
        //     {
        //         name: 'deepak',
        //         age : 22,
        //     }
        // ]);
        // console.log(insertCurser.insertedIds);

        const searchCursor = await collection.find({}); // pointer to the collection
        
        // to get all the documents in the collection print in table format
        // const docs = await searchCursor.toArray();
        // console.table(docs);

        while (await searchCursor.hasNext()) {
            console.log(await searchCursor.next());
        }
    } catch (error) {
        console.error(error);
    }
    finally {
        client.close();
    }
}
connect();