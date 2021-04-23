const csv = require('csvtojson');
const bcrypt = require('bcrypt');
const fs = require('fs');
var stringify = require('csv-stringify');

async function readData() {
    return csv()
        .fromFile(__dirname + '/data.csv')
        .then(
            (json) => json,
            (err) => err
        );
};

async function writeData(data) {
    const ws = fs.createWriteStream("out.csv");
    const values = await readData();
    var last = Array.isArray(values) ? values[values.length - 1].user_id : -1;
    data.password = await bcrypt.hashSync(data.password, 3);
    data = Object.assign({ user_id: last + 1 }, data);
    console.log(data);
    var records = [];
    records.push(data);
    await stringify(records, {
        header: true,
    }, function (err, output) {
        fs.appendFile(__dirname + '/data.csv', output, function(err) {
            if(err)
             throw err;
            else
             console.log("Success!");
        });
    });
    return data;
};

module.exports = {
    read: readData,
    write: writeData
};