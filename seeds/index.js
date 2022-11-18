const mongoose = require('mongoose');
const cities = require('./cities');
const { places, descriptors } = require('./seedhelpers');
const Campground = require('../models/campground');

main().catch(err => console.log(err));
async function main() {
    await mongoose.connect('mongodb://localhost:27017/yelp-camp');
    await console.log('Database connected!')
}

const sample = array => array[Math.floor(Math.random() * array.length)];

const seedDB = async () => {
    await Campground.deleteMany({});
    for (let i = 0; i < 200; i++) {
        const random1000 = Math.floor(Math.random() * 1000);
        const price = Math.floor(Math.random() * 20) + 10;
        const camp = new Campground({
            author: '6358ef0a2e8a836b63dc4e1e',
            location: `${cities[random1000].city}, ${cities[random1000].state}`,
            title: `${sample(descriptors)} ${sample(places)}`,
            description: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Fuga ad, eos voluptatum assumenda iure doloribus, odio, deleniti pariatur mollitia iste enim id sequi similique voluptatem dicta ex. Nihil, voluptas magnam!",
            price,
            geometry: {
                type: "Point",
                coordinates: [
                    cities[random1000].longitude,
                    cities[random1000].latitude
                ]
            },
            images: [
                {
                    url: 'https://res.cloudinary.com/dwcc1pkjg/image/upload/v1667735035/YelpCamp/hhjnux636nndwkkpu6rp.jpg',
                    filename: 'YelpCamp/hhjnux636nndwkkpu6rp',
                },
                {
                    url: 'https://res.cloudinary.com/dwcc1pkjg/image/upload/v1667735034/YelpCamp/mouf3d5cjhxv8mknb2lr.jpg',
                    filename: 'YelpCamp/mouf3d5cjhxv8mknb2lr',
                }
            ]
        })
        await camp.save();
    }
}

seedDB().then(() => {
    mongoose.connection.close();
})