require('dotenv').config();
const express = require('express' );
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const ProductRoutes = require('./routes/product.routes');

const path = require("path");
const PORT = process.env.PORT || 8081;
const DB_URI = process.env.DB_URI || "";

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

app.use('/api', ProductRoutes);

app.use(express.static(path.join(__dirname, "build")));

app.get("*", (req, res) => {
    res.sendFile(path.join(__dirname, "build", "index.html"));
});

app.listen(PORT, () => console.log(`Listening on port ${PORT}`));