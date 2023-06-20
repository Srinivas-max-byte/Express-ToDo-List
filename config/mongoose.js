const mongoose = require('mongoose');
mongoose.connect('mongodb+srv://Srinivas0025:kWMuH47A1ctXN9iQ@srinivasmaxbyte.yntrmrj.mongodb.net/?retryWrites=true&w=majority');
const db = mongoose.connection;
// error
db.on('error',console.error.bind(console,'error connecting to db'));
// up and running then message
db.once('open',function(){
    console.log('Success fully connected to the database')
})