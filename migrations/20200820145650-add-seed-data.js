const fs = require('fs');
const path = require('path');
module.exports = {
  async up(db, client) {
    const employees=[{
      "email": "test@gmail.com",
      "mobile": "1111",
      "city": "DHAKA",
      "__v": 0,
      "Age": null,
      "fullName": "Rashik Hasnat"
    },{
      "email": "Adeeb@gmail.com",
      "mobile": "222222",
      "city": "DHAKA",
      "__v": 0,
      "Age": null,
      "fullName": "Monwar Adeeb"
    },{
      "email": "Hasib@gmail.com",
      "mobile": "33333",
      "city": "DHAKA",
      "__v": 0,
      "Age": null,
      "fullName": "Hasib Khan"
    }];
         await db.collection('employees').insertMany(employees);
  },

  async down(db, client) {
    // TODO write the statements to rollback your migration (if possible)
    // Example:
    // await db.collection('albums').updateOne({artist: 'The Beatles'}, {$set: {blacklisted: false}});
    await db.collection('employees').deleteMany({$or:[{mobile: "1111"},{mobile:"222222"},{mobile:"33333"}]});
  }
};
