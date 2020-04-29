const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/User_Management', { useNewUrlParser: true,useUnifiedTopology: true})
    .then(() => console.log("connected"))
    .catch(error => console.log(error))

mongoose.set('useNewUrlParser', true);
mongoose.set('useFindAndModify', false);

module.exports = mongoose;