require('dotenv').config();

const { ApolloServer, AuthenticationError } = require('apollo-server')
const typeDefs = require('./graphql/schema')
const resolvers = require('./graphql/resolvers')
const fetch = require('./data/fetch');
const auth = require('./utility/authentication');
const jwt = require('jsonwebtoken');
const cookieParser = require('cookie-parser');

const server = new ApolloServer({
    typeDefs,
    resolvers,
    context: ({ req, res }) => {
        const user = {};
        req.cookies && jwt.verify(req.cookies.token, process.env.SECRET_KEY, function (err, decoded) {
                // add user id to request
                user.id = decoded.id;
                user.loggedIn = true;
                console.log(user);
        });
        return {auth, fetch, user, res, req};
    }
});
server
    .listen()
    .then(({ url }) => console.log(`Server is running on ${url}`));



