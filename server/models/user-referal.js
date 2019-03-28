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
    referal_URL: {
        type: String,
        match: urlRegex
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

userReferalSchema.pre('validate', function(next){
    let hasValidator = false;
    hasValidator = !!(this.referal_identifier.referal_URL | this.referal_identifier.referal_code);

    return hasValidator;
})

userReferalSchema.virtual('identifier').get(function(){
    return this.referal_identifier.referal_URL || this.referal_code;
});

module.exports =  mongoose.model('UserReferals', userReferalSchema);