const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const urlRegex = require('../constants').urlRegex;

const userReferalSchema = Schema({
    name: {
        type: String,
        required: false
    },
    product: {
        type: Schema.Types.ObjectId,
        ref: 'Products',
        required: [true, "Must have reference to Product that the referal works with"]
    },
    referalAmount: {
        type: Number,
        required: false
    },
    referalIdentifier: {
        type: String,
        required: [true, "Must have an identifier, either a URL or a Referal Code"]
    },
    preferred: {
        type: Boolean,
        required: true,
        default: false
    },
    meta: {
        rolled: {
            type: Number,
            default: 0
        },
        clicked: {
            type: Number,
            default: 0
        }
    }
}, {
    createdAt: 'created_at',
    updatedAt: 'updated_at',
    collection: 'UserReferals'
});

module.exports =  mongoose.model('UserReferals', userReferalSchema);