require('dotenv').config();
const express = require('express' );
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const ProductRoutes = require('./routes/product.routes');
const UserReferalRoutes = require('./routes/user-referal.routes');
const ImageRoutes = require('./routes/images.routes');
const UsersRoutes = require('./routes/users.routes');
const cloudinary = require('cloudinary');
const passport = require('passport');

const path = require("path");
const PORT = process.env.SERVER_PORT || 8080;
const DB_URI = process.env.DB_URI || "";

cloudinary.config({
    cloud_name: process.env.CLOUDINARY_NAME,
    api_key: process.env.CLOUDINARY_KEY,
    api_secret: process.env.CLOUDINARY_SECRET
});

const app = express();
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

if(DB_URI){
    mongoose.connect(DB_URI);
    var db = mongoose.connection;
    db.on('error', console.error.bind(console, "MongoDB connection error"));
    db.once("open", () => console.log("Connected"));
} else {
    console.log("No URI found");
}

app.use(passport.initialize());
require('./config/passport')(passport);

app.use('/api/products', ProductRoutes);
app.use('/api/referals', UserReferalRoutes);
app.use('/api/images', ImageRoutes);
app.use('/api/users', UsersRoutes);

app.use(express.static(path.join(__dirname, "build")));

app.get("*", (req, res) => {
    res.sendFile(path.join(__dirname, "build", "index.html"));
});

app.listen(PORT, () => console.log(`Listening on port ${PORT}`));