const mongoose = require('mongoose');
const config = require('./config');
const User = require('./models/User');
const Ingredient = require('./models/Ingredient');

const run = async () => {
    await mongoose.connect(config.database, config.databaseOptions);

    const collections = await mongoose.connection.db.listCollections().toArray();

    for (let coll of collections) {
        await mongoose.connection.db.dropCollection(coll.name);
    }

    const user = await User.create({
        username: 'admin',
        password: '123',
        token: '12345678910',
        displayName: 'Jack',
        role: 'admin'
    });

    await Ingredient.create({
        user: user,
        title: 'Long Island Iced Tea',
        image: 'long-island.jpeg',
        recipe: 'Fill a cocktail shaker with ice Pour vodka, rum, gin, tequila, ' +
            'triple sec, and sour mix over ice, cover and shake. Pour cocktail into a Colins or hurricane ' +
            'glass, top with splash of cola for color Garnish with a lemon slice.',
        ingredients: [
            {name: 'White rum', amount: '15 ml'},
            {name: 'Tequila', amount: '15 ml'},
            {name: 'Vodka', amount: '15 ml'},
            {name: 'Triple sec', amount: '15 ml'},
            {name: 'Gin', amount: '15 ml'},
            {name: 'Sour mix', amount: '30 ml'},
            {name: 'Cola', amount: '50 ml'},
            {name: 'Lime', amount: '2 slice'},
        ],
        published: true
    }, {
        user: user,
        title: 'Margarita',
        image: 'margarita.jpeg',
        recipe: 'Chill your glass (the easiest way is to fill it with ice).' +
            ' Put lots of ice and all of the ingredients into a shaker, then ' +
            'shake hard for about 30 seconds to chill the liquid really well. ' +
            'Run a lime wedge around the outside of the rim of your glass before rolling the rim in salt ' +
            'Double strain the mix into the glass',
        ingredients: [
            {name: 'Cazadores Tequila', amount: '1 part'},
            {name: 'triple sec liqueur', amount: '½ part'},
            {name: 'lime juice', amount: '½ part'},
            {name: 'wedge', amount: '1 lime'},
            {name: 'Salt', amount: '15 mg'},
            {name: 'Cubed ice', amount: '2 piece'}
        ],
        published: true
    }, {
        user: user,
        title: 'Tequila',
        image: 'tequila.jpeg',
        recipe: 'Gather ingredients. In a highball glass filled with ice cubes, pour the tequila and orange juice. ' +
            'Stir well. Slowly pour the grenadine around the inside edge of the glass. ' +
            'It will sink and gradually rise to mix with the other ingredients. ' +
            'Garnish with an orange slice and cherry. Serve and enjoy!',
        ingredients: [
            {name: 'tequila', amount: '2 ounces'},
            {name: 'orange juice', amount: '4 ounces'},
            {name: 'grenadine', amount: '1/2 ounce'},
            {name: 'orange slice', amount: 'Garnish'},
            {name: 'maraschino cherry', amount: 'Garnish'}
        ],
        published: true
    });

    mongoose.connection.close();
};

run().catch(e => {
    mongoose.connection.close();
    throw e;
});