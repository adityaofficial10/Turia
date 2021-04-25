require('dotenv').config({
    path:'config/.env'
});

const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { read, write } = require('./fetch');
const { AuthenticationError } = require('apollo-server');
const cookieParser = require('cookie-parser');

async function login(email, password) {

    const values = await read();
    var ok = Array.isArray(values) ? values.findIndex(x => x.email == email) : 0;
    if (ok != -1) {
        if (bcrypt.compareSync(password, values[ok].password)) {
            const token = jwt.sign({ id: values[ok].user_id }, process.env.SECRET_KEY, { expiresIn: '1h' });
            return { user_id: values[ok].user_id, email: values[ok].email, token: token };
        }
        else
            return new AuthenticationError('Incorrect Password!');
    }
    else
        return new AuthenticationError('There is no user registered with this email.');
};

module.exports = {
    login
};