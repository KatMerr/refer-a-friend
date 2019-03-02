const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const urlRegex = require('../constants').urlRegex;

const userReferalSchema = Schema({
    name: {
        type: String,
        required: false
    },
    referal_option: {
        type: Schema.Types.ObjectId,
        ref: 'referal-option',
        required: [true, "Must have reference to Product that the referal works with"]
    },
    referal_identifier: {
        referal_URL: {
            type: String,
            match: urlRegex
        },
        referal_code: {
            type: String,
        }
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
    updatedAt: 'updated_at'
});

userReferalSchema.pre('validate', function(next){
    let hasValidator = false;
    hasValidator = !!(this.referal_identifier.referal_URL | this.referal_identifier.referal_code);

    return hasValidator;
})

userReferalSchema.virtual('identifier').get(function(){
    return this.referal_identifier.referal_URL || this.referal_code;
});

export default mongoose.model('UserReferal', userReferalSchema);