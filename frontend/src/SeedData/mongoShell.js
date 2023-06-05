const fs = require('fs');
const { MongoClient } = require('mongodb');

// Connection URL and database name
const url = 'mongodb://127.0.0.1:27017';
const dbName = 'mydatabase';

// Read the contents of the users.json and articles.json files
const usersData = fs.readFileSync('./users.json', 'utf8');
const articlesData = fs.readFileSync('./articles.json', 'utf8');

// Parse the JSON data from the files
const users = JSON.parse(usersData);
const articles = JSON.parse(articlesData);

// Create a new MongoClient
const client = new MongoClient(url);

async function importData() {
  try {
    // Connect to the MongoDB server
    await client.connect();

    // Access the database
    const db = client.db(dbName);

    // Drop the existing collections
    // await db.collection('users').drop();
    await db.collection('articles').drop();

    // Insert the users and articles data into the respective collections
    // await db.collection('users').insertMany(users);
    await db.collection('articles').insertMany(articles);

    console.log('Data import completed.');
  } catch (err) {
    console.error('Error occurred:', err);
  } finally {
    // Close the connection
    await client.close();
  }
}

// Call the importData function
importData();
