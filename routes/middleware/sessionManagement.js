const session = require('express-session');
const MongoDBStore = require('connect-mongo');
require('dotenv').config();

// Initialize session management middleware
module.exports = function(app) {
  app.use(session({
    secret: process.env.SESSION_SECRET, // Use environment variable for session secret
    resave: false,
    saveUninitialized: true,
    store: MongoDBStore.create({
      mongoUrl: process.env.MONGODB_URI, // Use environment variable for MongoDB connection string
      collectionName: 'sessions'
    }),
    cookie: { maxAge: 1800000 } // Session expires after 30 minutes of inactivity
  }));

  app.use((req, res, next) => {
    if (!req.session.user) {
      req.session.user = { loggedIn: false };
    }
    next();
  });

  console.log("Session management initialized.");
};