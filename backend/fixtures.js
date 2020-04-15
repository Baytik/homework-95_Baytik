const mongoose = require('mongoose');
const config = require('./config');
const User = require('./models/User');

const run = async () => {
    await mongoose.connect(config.database, config.databaseOptions);

    const collections = await mongoose.connection.db.listCollections().toArray();

    for (let coll of collections) {
        await mongoose.connection.db.dropCollection(coll.name);
    }

    await User.create({
        username: 'admin',
        password: '123',
        token: '12345678910',
        displayName: 'Jack',
        role: 'admin'
    });

    mongoose.connection.close();
};

run().catch(e => {
    mongoose.connection.close();
    throw e;
});