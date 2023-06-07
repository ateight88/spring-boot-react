/* Don't run - For testing only */

const { v4: uuidv4 } = require('uuid');
const { faker } = require('@faker-js/faker');
const fs = require('fs');

const getRandomCategory = categories => {
  function pickRandomIndex(array) {
    const randomIndex = Math.floor(Math.random() * array.length);
    return randomIndex;
  }

  const randomIndex = pickRandomIndex(categories);
  const randomCategory = categories[randomIndex];
  return randomCategory;
};

const categories = ['sports', 'politics', 'lifestyle', 'current_affairs'];

// Generate a random User object
const generateUser = () => {
  return {
    // gid: uuidv4(), // Generate UUID for the user ID
    name: faker.person.firstName(),
    department: getRandomCategory(categories),
    articles: [],
    createdAt: faker.date.recent(),
    modifiedAt: faker.date.recent(),
  };
};

// Generate a random Article object
const generateArticle = users => {
  const randomUserIndex = Math.floor(Math.random() * users.length);
  const randomUser = users[randomUserIndex];
  // const articleId = uuidv4(); // Generate UUID for the article ID

  // randomUser.articles.push(articleId);

  const readNumber = () => {
    const randomIndex = Math.floor(Math.random() * 100);
    return randomIndex;
  };

  return {
    // gid: articleId,
    department: randomUser.department,
    title: faker.lorem.sentence(),
    summary: faker.lorem.paragraph(),
    full: faker.lorem.paragraphs(),
    published: faker.datatype.boolean,
    numberOfReads: readNumber(),
    // createdBy: randomUser.gid,
    createdBy: null,
    createdAt: faker.date.recent(),
    modifiedAt: faker.date.recent(),
  };
};

// Generate random Users and Articles
const generateData = () => {
  const users = [];
  const articles = [];

  // Generate Users
  for (let i = 0; i < 10; i++) {
    const user = generateUser();
    users.push(user);
  }

  // Generate Articles
  for (let i = 0; i < 20; i++) {
    const article = generateArticle(users);
    articles.push(article);
  }

  // Save Users and Articles to JSON files
  fs.writeFileSync('users.json', JSON.stringify(users, null, 2));
  fs.writeFileSync('articles.json', JSON.stringify(articles, null, 2));

  console.log('Data generation completed.');
};

// Call the generateData function to start data generation
generateData();
