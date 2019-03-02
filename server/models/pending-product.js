const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const urlRegex = require('../constants').urlRegex;

const pendingProductSchema = new Schema({
    name: {
        type: String,
        required: [true, "Referal option must have a name"],
        unique: true,
        trim: true
    },
    imageSrc: {
        type: String,
        required: false,
        default: "//basic-image-url"
    },
    company: {
        type: String,
        required: false
    },
    tags: {
        type: [String],
        required: false,
        default: []
        //,enum: "Credit Card, online shopping, etc."
    },
    referalPage: {
        type: String,
        required: false,
        match: urlRegex
    },
    usesCode: {
        type: Boolean,
        default: false
    }
},{
    createdAt: 'created_at'
});

export default mongoose.model('PendingProduct', pendingProductSchema);