const { gql } = require('apollo-server')

const typeDefs = gql`
    type User {
        user_id: Int!
        first_name: String!
        last_name: String!
        phone_number: String!
        email: String!
        password: String!
        coachmark_visited: Boolean!
        assessment_complete: Boolean!
        assessment_skipped: Boolean!
        created_date: String!
        last_login: String!
        last_updated_date: String!
      }
    type Query {
        user(id: String!): User!
    }
    type Mutation {
        login(email: String!, password: String!): User!
        create(first_name: String!, last_name: String!, phone_number: String!, email: String!, password: String!): User!
    }
`

module.exports = typeDefs
