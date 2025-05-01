const fs = require('fs');

function readDb(db = 'db.json') {
    const data = fs.readFileSync(db);
    return JSON.parse(data);
};

function writeDb(obj, data, db = 'db.json') {
    if (!data) return console.log('No data to save!');
    if (!obj) return console.log('No object to save the data');

    try {
        dbData = readDb();
        dbData[obj].push(data);
        fs.writeFileSync(db, JSON.stringify(dbData));
        return console.log('Save succesful');
    } catch (err) { return console.log('Save failed'); }
};

module.exports = {readDb, writeDb};