const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const {read, write} = require('../data/fetch');
const { AuthenticationError } = require('apollo-server');

async function login (email, password) {

  const values = await read();
  console.log(values);
  var ok = Array.isArray(values) ? values.findIndex(x => x.email == email) : 0;
  if(ok != -1) {
      if(bcrypt.compareSync(password, values[ok].password)){
          return values[ok];
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