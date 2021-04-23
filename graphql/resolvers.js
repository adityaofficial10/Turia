const resolvers = {
    Query: {
        async user(root, { id }, { fetch }) {
            var values = await fetch.read();
            var data = values[values.findIndex(x => x.user_id == id)];
            return data;
        }
    },
    Mutation: {
        async login (root, {  email, password }, { auth }) {
            await auth.login(email, password); 
        },
        async create (root, { first_name, last_name, phone_number, email, password }, { fetch }) {
            await fetch.write({first_name:first_name, last_name: last_name, phone_number: phone_number, email: email, password: password, coachmark_visited: '0', assessment_complete: '0', assessment_skipped: '0', created_date: (new Date()).toISOString(),last_login: '', last_updated_date: (new Date()).toISOString()});
        }
    }

}

module.exports = resolvers
