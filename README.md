## Getting Started

1. run `npm install`
2. rename `sample.env` to `.env`
3. change the connection string in `.env` to your MongoDb/DocumentDb database
4. run `DEBUG=mongodb-azure-documentdb:* node bin/www `
5. open http://localhost:3000 in your browser

## How It Works

This is a simple Express + Mongoose application. There is a single model `user` that tests some of the common mongoose/mongo types; array, string, number, range validation.

The application can create a new user, list all the users, update a user, and remove a user from the DocumentDB database.