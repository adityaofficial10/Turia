require('dotenv').config({
    path: 'config/.env'
});

const { ApolloServer, AuthenticationError } = require('apollo-server')
const typeDefs = require('./graphql/schema')
const resolvers = require('./graphql/resolvers')
const fetch = require('./utility/fetch');
const auth = require('./utility/authentication');
const jwt = require('jsonwebtoken');
const cookieParser = require('cookie-parser');

const server = new ApolloServer({
    typeDefs,
    resolvers,
    context: ({ req, res }) => {
        const user = {};
        const token = req.get('Authorization') || '';
        token && jwt.verify(token, process.env.SECRET_KEY, function (err, decoded) {
                // add user id to request
                user.id = decoded.id;
                user.loggedIn = true;
        });
        return {auth, fetch, user, res, req};
    }
});
server
    .listen({
        port: process.env.PORT || 4000
    })
    .then(({ url }) => console.log(`Server is running on ${url}`));