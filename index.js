// index.js
import express from 'express';
import mongoose from 'mongoose';
import Profile from './models/Profile.js'; // Adjust the path as necessary
import cors from 'cors';

const app = express();
const PORT = 8000;

// Middleware
app.use(cors());
app.use(express.json());
app.set('view engine', 'ejs')

// MongoDB Connection
const mongoURI = 'mongodb://127.0.0.1:27017/linkedinProfiles'; // Replace with your MongoDB connection string
mongoose.connect(mongoURI, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log('MongoDB connected successfully.'))
    .catch(err => console.error('MongoDB connection error:', err));

// Hardcoded profiles
const hardcodedProfiles = [
    {
        name: "Shilpa Sharma",
        url: "https://www.linkedin.com/in/shilpa-sharma-49362822a/",
        about: "Software Engineer at Company X",
        bio: "Passionate about technology and innovation.",
        location: "City, Country",
        followerCount: 150,
        connectionCount: 300,
    },
    {
        name: "Divya Rana",
        url: "https://www.linkedin.com/in/divya-rana-72778621b/",
        about: "Product Manager at Company Y",
        bio: "Loves building great products.",
        location: "City, Country",
        followerCount: 200,
        connectionCount: 400,
    },
    {
        name: "Arushi Sambyal",
        url: "https://www.linkedin.com/in/arushi-sambyal-4b3904259/",
        about: "UX Designer at Company Z",
        bio: "Designing user experiences.",
        location: "City, Country",
        followerCount: 100,
        connectionCount: 250,
    },
];
app.get('/', (req, res) => {
    res.render('index');

});

// POST route to add hardcoded profiles to the database
app.get('/profiles', async (req, res) => {
    try {
        let createdProfiles = await Profile.insertMany(hardcodedProfiles);

        res.status(201).json(createdProfiles);
        // res.send(createdProfiles);

    } catch (error) {
        console.error('Error adding profiles:', error);
        res.status(500).json({ error: 'Failed to add profiles' });
    }
});

// GET route to retrieve profiles
app.get('/profiles', async (req, res) => {
    try {

        const profiles = await Profile.find();
        if (!profiles.length) {
            return res.status(404).json({ error: 'No profiles available' });
        }

        res.json(profiles);
    } catch (error) {
        console.error('Error fetching profiles from database:', error);
        res.status(500).json({ error: 'Failed to fetch profiles' });
    }
});

// Start the server
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
