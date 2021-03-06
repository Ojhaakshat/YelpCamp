const mongoose = require('mongoose');
const Campground = require('../models/campground');
const cities = require('./cities')
const {descriptors, places} = require('./seedHelpers');

mongoose.connect('mongodb://localhost:27017/yelp-camp', {
    useNewUrlParser:true,
    useCreateIndex:true,
    useUnifiedTopology:true
});

const db= mongoose.connection;
db.on("error", console.error.bind(console,"connection-error:"));
db.once("open", () => {
    console.log("Database connected");
});
const sample = array => array[Math.floor(Math.random()*array.length)];
const seedDb = async () => {
    for(let i = 0; i < 50; i++) { 
        const rand1000 = Math.floor(Math.random()*1000);
        const price = Math.floor(Math.random()*20) + 10;
        const camp = new Campground ({
            author: '5ffea1e6abd14f1e01ba0ac7',
            title: `${sample(descriptors)} ${sample(places)}`,
            location: `${cities[rand1000].city}, ${cities[rand1000].state}`,
            image: 'https://source.unsplash.com/collection/483251',
            description: 'Lorem ipsum dolor sit amet consectetur, adipisicing elit. Rem ipsa reprehenderit qui modi sed sint beatae quas. Dolorem iure distinctio consequuntur officiis eaque quis, aliquam facilis at. Qui, distinctio rerum.',
            price
        })
        await camp.save();
    }
}
seedDb().then(() => {
    mongoose.connection.close();
})