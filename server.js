const { ApolloServer } = require('apollo-server')
const typeDefs = require('./graphql/schema')
const resolvers = require('./graphql/resolvers')
const fetch = require('./data/fetch');
const auth = require('./utility/authentication');

const server = new ApolloServer({
    typeDefs,
    resolvers,
    context: { fetch, auth }
});
  
server
    .listen()
    .then(({ url }) => console.log(`Server is running on ${url}`));
  


