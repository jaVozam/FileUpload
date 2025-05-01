const fs = require('fs');

function readDb(db = 'db.json') {
    const data = fs.readFileSync(db);
    return JSON.parse(data);
};

function writeDb(data, db = 'db.json') {
    if (!data) return console.log('No data to save!');

    try {
        fs.writeFileSync(db, JSON.stringify(data));
        return console.log('Save succesful');
    } catch (err) { return console.log('Save failed'); }
};

function addData(obj, data, db = 'db.json') {
    if (!data) return console.log('No data to save!');
    if (!obj) return console.log('No object to save the data!');

    dbData = readDb();
    dbData[obj].push(data);
    writeDb(dbData, db);
};

function deleteData(obj, id, db = 'db.json') {
    if (!id) return console.log('No id of an object to delete!');
    if (!obj) return console.log('No object to delete the data!');

    dbData = readDb();
    const originalLength = dbData[obj].length;
    dbData[obj] = dbData[obj].filter(item => item.id != id);

    if (dbData[obj].length === originalLength) return console.log(`No item with id '${id}' found in '${obj}'.`);

    writeDb(dbData, db);
};

module.exports = { readDb, writeDb, addData, deleteData };