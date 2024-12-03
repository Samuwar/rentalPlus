const app = require("./app");
const usersRouter = require("./routes/v1/users")

const dotenv = require('dotenv');
const mongoose = require('mongoose');

// Load environment variables from .env file
// const PORT = 4000;
dotenv.config();
// app.listen(PORT, () => {
//   console.log(`Running on port ${PORT}`)
// })



mongoose.connect(process.env.MONGODB_URI)
    .then(() => {
      console.log('✅ Connected to MongoDB'); 
  
      // Start the server only after successful DB connection
      const PORT = process.env.PORT || 5000;
      app.listen(PORT, () => {
        console.log(`🚀 Server is running on port ${PORT}`);
      });
    })
    .catch(err => {
      console.error('❌ Failed to connect to MongoDB', err);
      process.exit(1); // Exit process with failure
    });

    app.use('/users', usersRouter);
    
    // ERROR HANDLING
    app.use(function(err, req, res, next){
      res.status(422).send({error: err.message})
    })