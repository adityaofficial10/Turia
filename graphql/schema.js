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
    type loggedinUser {
        user_id: Int!
        email: String!
        token: String!
    }
    type Query {
        user(id: String!): User!
        users: [User!]
    }
    type Mutation {
        login(email: String!, password: String!): loggedinUser!
        create(first_name: String!, last_name: String!, phone_number: String!, email: String!, password: String!): User!
        logout: User!
        delete(email: String!, phone_number: String!, password: String!): User!
        updatePassword(email: String!, currentPassword: String!, newPassword: String!): User!
        updatePhoneNumber(email: String!, password: String!, phone_number: String!): User!
    }
`

module.exports = typeDefs
