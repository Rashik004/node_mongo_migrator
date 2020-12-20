module.exports = {
  async up(db, client) {
    // TODO write your migration here.
    // See https://github.com/seppevs/migrate-mongo/#creating-a-new-migration-script
    // Example:
    // await db.collection('albums').updateOne({artist: 'The Beatles'}, {$set: {blacklisted: true}});
    await db.collection('employees').find({ lastName: { $exists: false }}).forEach(result => {
      if (!result) return ;
      if (result.fullName) {
         const { test } = result.fullName;
         console.log(result.fullName);
         result.lastName = result.fullName.split(' ')[1]
         result.firstName = result.fullName.split(' ')[0]
      }
      return db.collection('employees').save(result)
   });
   await db.collection('employees').updateMany({fullName: { $exists: true }}, {$unset: {fullName:1}});
  },

  async down(db, client) {
    // TODO write the statements to rollback your migration (if possible)
    // Example:
    // await db.collection('albums').updateOne({artist: 'The Beatles'}, {$set: {blacklisted: false}});
    await db.collection('employees').find({ lastName: { $exists: true }}).forEach(result => {
      if (!result) return ;
      console.log(result.firstName);
      result.fullName = result.firstName + " " + result.lastName;
      return db.collection('employees').save(result)
   });
   await db.collection('employees').updateMany({lastName: { $exists: true }}, {$unset: {lastName:1, firstName:1}});
  }
};
