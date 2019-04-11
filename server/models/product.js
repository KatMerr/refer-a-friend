const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const urlRegex = require('../constants').urlRegex;

const productSchema = new Schema({
    name: {
        type: String,
        required: [true, "Referal option must have a name"],
        trim: true
    },
    company: {
        type: String,
        required: false,
        trim: true
    },
    imageSrc: {
        type: String,
        required: false,
        default: "//basic-image-url"
    },
    cardDetails: {
        required: false,
        annualFee: {
            type: String,
            required: false
        },
        benefits: {
            type: [String],
            required: false
        },
        introBonus: {
            type: String,
            required: false
        },
        issuer: {
            type: String,
            required: false
        },
        rewardType: {
            type: String,
            required: false
        }
    },
    tags: {
        type: [String],
        required: false,
        default: []
        //,enum: "Credit Card, online shopping, etc."
    },
    referalIdentifer: {
        type: String,
        required: false
        //Enum: "Url or Code"
    },
    usesCode: {
        type: Boolean,
        default: false
    },
    pending: {
        type: Boolean,
        default: true
    },
    approved_by: {
        type: String,
        required: false,
        default: "0"
    },
    meta: {
        timesPicked: Number
    }
},{
    collection: 'Products'
});

productSchema.index({ name: 1, company: 1 }, { unique: true});

module.exports = mongoose.model('Products', productSchema);