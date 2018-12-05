var mongoose = require('mongoose');

var bcrypt   = require('bcrypt-nodejs');

var userSchema = mongoose.Schema({

    local            : {
        email        : String,
        password     : String
    }

    
},

    {
        collection: 'users'
      }
);

//tehdään hash+salt bcryptillä
userSchema.methods.generateHash = function(password) {
    return bcrypt.hashSync(password, bcrypt.genSaltSync(8), null);
};

//tarkistetaan onko salasana oikein
userSchema.methods.validPassword = function(password) {
    return bcrypt.compareSync(password, this.local.password);
};

//exportataan modeli käytettävksi muualla
module.exports = mongoose.model('User', userSchema);