const cookieParser = require('cookie-parser');
const { AuthenticationError } = require('apollo-server');
const { deleteUser, updatePassword, updatePhoneNumber } = require('../utility/utils');

const resolvers = {
    Query: {
        async user(root, { id }, { fetch }) {
            var values = await fetch.read();
            var data = values[values.findIndex(x => x.user_id == id)];
            return data;
        },
        async users(root, {}, { fetch }) {
            var values = await fetch.read();
            return values;
        }
    },
    Mutation: {
        async login (root, {  email, password }, { auth, res, req }) {
            const data = await auth.login(email, password); 
            await res.cookie('token', data.token, {
                maxAge: 1000 * 60 * 60, // 1 hour
            });
            return data;
        },
        async create (root, { first_name, last_name, phone_number, email, password }, { fetch }) {
            const data = await fetch.write({first_name:first_name, last_name: last_name, phone_number: phone_number, email: email, password: password, coachmark_visited: '0', assessment_complete: '0', assessment_skipped: '0', created_date: (new Date()).toISOString(),last_login: '', last_updated_date: (new Date()).toISOString()});
            return data;
        },
        async logout (root, {}, {res, user, fetch, req}) {
            if(user.loggedIn) {
                res.clearCookie('token');
                const values = await fetch.read();
                var data = values[values.findIndex(x => x.user_id == user.id)];
                return data;
            }
            else 
            return new AuthenticationError('You must be logged in first..');
        },
        async delete (root, { email, phone_number, password }, { fetch }) {
            const data = await deleteUser(email, phone_number, password);
            return data;
        },
        async updatePassword (root, { email, currentPassword, newPassword }, { fetch }) {
            const data = await updatePassword(email, currentPassword, newPassword);
            return data;
        },
        async updatePhoneNumber (root, { email, password, phone_number }, { fetch }) {
            const data = await updatePhoneNumber(email, password, phone_number);
            return data;
        }
    }

}

module.exports = resolvers
