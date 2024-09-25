import mongoose from "mongoose";
mongoose.connect(`mongodb://127.0.0.1:27017/linkedinProfiles`)

const profileSchema = mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    url: {
        type: String,
        required: true,
    },
    about: {
        type: String,
    },
    bio: {
        type: String,
    },
    location: {
        type: String,
    },
    followerCount: {
        type: Number,
    },
    connectionCount: {
        type: Number,
    },
});

const Profile = mongoose.model('Profile', profileSchema);

export default Profile;

