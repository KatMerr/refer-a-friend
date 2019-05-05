const mongoose = require('mongoose');
const Schema = mongoose.Schema;

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
    image: {
        imageURL: {
            type: String,
            required: false
        },
        publicID: {
            type: String,
            required: false
        }
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
        required: false
    },
    referalIdentifier: {
        type: String,
        required: false
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