/* Don't run - For testing only */

const { v4: uuidv4 } = require('uuid');
const { faker } = require('@faker-js/faker');
const MongoClient = require('mongodb').MongoClient;

// MongoDB connection settings
const uri = 'mongodb://127.0.0.1:27017'; // Replace with your MongoDB URI
const dbName = 'mydatabase'; // Replace with your database name

function getRandomCategory(categories) {
  function pickRandomIndex(array) {
    const randomIndex = Math.floor(Math.random() * array.length);
    return randomIndex;
  }

  const randomIndex = pickRandomIndex(categories);
  const randomCategory = categories[randomIndex];
  return randomCategory;
}

const categories = ['sports', 'politics', 'lifestyle', 'current_affairs'];

// Generate a random User object
function generateUser() {
  return {
    gid: uuidv4(),
    name: faker.person.firstName(),
    department: getRandomCategory(categories),
    articles: [],
    createdAt: faker.date.recent(),
    modifiedAt: faker.date.recent(),
  };
}

// Generate a random Article object
function generateArticle(users) {
  const randomUserIndex = Math.floor(Math.random() * users.length);
  const randomUser = users[randomUserIndex];
  const articleId = uuidv4();

  randomUser.articles.push(articleId);

  function readNumber() {
    const randomIndex = Math.floor(Math.random() * 100);
    return randomIndex;
  }

  return {
    gid: articleId,
    department: randomUser.department,
    title: faker.lorem.sentence(),
    summary: faker.lorem.paragraph(),
    full: faker.lorem.paragraphs(),
    published: faker.boolean,
    numberOfReads: readNumber(),
    createdBy: randomUser.id,
    createdAt: faker.date.recent(),
    modifiedAt: faker.date.recent(),
  };
}

// Generate random Users and Articles
async function generateData() {
  const client = new MongoClient(uri, { useUnifiedTopology: true });

  try {
    await client.connect();
    const db = client.db(dbName);

    const usersCollection = db.collection('users');
    const articlesCollection = db.collection('articles');

    // Generate Users
    const users = [];
    for (let i = 0; i < 10; i++) {
      const user = generateUser();
      users.push(user);
    }

    // Generate Articles
    const articles = [];
    for (let i = 0; i < 20; i++) {
      const article = generateArticle(users);
      articles.push(article);
    }

    // Insert Users
    await usersCollection.insertMany(users);
    console.log('Users inserted successfully.');

    // Insert Articles
    await articlesCollection.insertMany(articles);
    console.log('Articles inserted successfully.');

    console.log('Data generation completed.');
  } catch (err) {
    console.error('Error generating data:', err);
  } finally {
    client.close();
  }
}

// Call the generateData function to start data generation
generateData();
