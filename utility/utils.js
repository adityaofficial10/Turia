require('dotenv').config({
    path:'config/.env'
});
const fs = require('fs');
var stringify = require('csv-stringify');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { read, write } = require('./fetch');
const { AuthenticationError, UserInputError } = require('apollo-server');
const cookieParser = require('cookie-parser');

async function deleteUser(email, phone_number, password) {
    var data = await read();
    if(data && Array.isArray(data)) {
        var record = data[data.findIndex(x => x.email == email && x.phone_number == phone_number)];
        if(bcrypt.compareSync(password, record.password)){
            data = data.filter(x => x.email != email);
            await stringify(data, {
                header: true,
            }, function (err, output) {
                var path = __dirname;
                path = path.substr(0, path.length - 7) + '/data/data.csv';
                fs.writeFile(path, output, function(err) {
                    if(err)
                     throw err;
                    else
                     console.log("Success!");
                });
            });
            return record;
        }else{
            return new AuthenticationError('Password entered was incorrect.');
        }
    }
    else
     return new UserInputError("The user with the given credentials doesn't exist.");
}

async function updatePassword(email, currentPassword, newPassword) {
    var data = await read();
    if(data && Array.isArray(data)) {
        var index = data.findIndex(x => x.email == email);
        if(index && index != -1 && bcrypt.compareSync(currentPassword, data[index].password)){
            data[index].password = await bcrypt.hashSync(newPassword, 3);
            data[index].last_updated_date = (new Date()).toISOString();
            await stringify(data, {
                header: true,
            }, function (err, output) {
                var path = __dirname;
                path = path.substr(0, path.length - 7) + '/data/data.csv';
                fs.writeFile(path, output, function(err) {
                    if(err)
                     throw err;
                    else
                     console.log("Success!");
                });
            });
            return data[index];
        }else{
            return new AuthenticationError('Password entered was incorrect.');
        }
    }
    return new UserInputError("The user with the given credentials doesn't exist.");
}

async function updatePhoneNumber(email, password, phone_number) {
    var data = await read();
    if(data && Array.isArray(data)) {
        var index = data.findIndex(x => x.email == email);
        if(index && index != -1 && bcrypt.compareSync(password, data[index].password)){
            data[index].phone_number = phone_number;
            data[index].last_updated_date = (new Date()).toISOString();
            await stringify(data, {
                header: true,
            }, function (err, output) {
                var path = __dirname;
                path = path.substr(0, path.length - 7) + '/data/data.csv';
                fs.writeFile(path, output, function(err) {
                    if(err)
                     throw err;
                    else
                     console.log("Success!");
                });
            });
            return data[index];
        }else{
            return new AuthenticationError('Password entered was incorrect.');
        }
    }
    return new UserInputError("The user with the given credentials doesn't exist.");
}

module.exports = {
    deleteUser,
    updatePassword,
    updatePhoneNumber
};