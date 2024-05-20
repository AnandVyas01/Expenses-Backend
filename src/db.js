const mongo = require("mongodb");
const { default: mongoose } = require("mongoose");
require("dotenv").config();

const uri = process.env.MONGO_URI;
const dbName = process.env.dbName;

async function initializeApp() {
  try {
    const client = new mongo.MongoClient(uri, {});
    await client.connect();
    const db = client.db(dbName);

    // Check if the collection exists
    const collections = await db.listCollections().toArray();
    const collectionNames = collections.map((col) => col.name);

    if (!collectionNames.includes("users")) {
      // If the collection doesn't exist, create it
      await db.createCollection("users");
      console.log("Collection 'users' created successfully");
    } else {
      console.log("Collection 'users' already exists");
    }

    // Close the connection
    // await client.close();
  } catch (error) {
    console.error("Error initializing app:", error);
  }
}

// initializeApp();

//function to connect to monngoDB
const mongoConnnection = async () => {
  try {
    //   const client = await mongo.MongoClient.connect(uri, {}); //we use this to connect to db using mongoDb 
    await mongoose.connect(uri); //to connect to database using mongoose.
    console.log("DataBase Connected Successfully");
  } catch (error) {
    console.log(
      "Some Error Occured while connecting to MongoDb" + error.message
    );
  }
};

module.exports = mongoConnnection;
