const mongoose = require('mongoose');
export = mongoose.connect('mongodb://localhost:27017/ojay', {
  useUnifiedTopology: true,
  useNewUrlParser: true,
  useFindAndModify: false
})