const express = require('express');
const cors = require('cors')
require('./db/config');
const Post = require('./db/Post');
const app = express();

app.use(express.json());
app.use(cors());

app.post('/register', async (req,res)=> {
  let post = new Post(req.body);
  let result = await post.save()
  res.send(result);
})

// app.delete('/register/:id', (req, res) => {
//   const id = req.params.id;

//   Post.findByIdAndDelete(id)
//     .then(() => {
//       res.status(204).send(); // Send a 204 No Content response for success
//     })
//     .catch((error) => {
//       console.log(error);
//       res.status(500).json({ error: 'An error occurred' });
//     });
// });



// const mongoose = require('mongoose');
// const cors = require('cors');
// const Schema = mongoose.Schema




// const dbURI = 'mongodb+srv://test:test1234@cluster0.wcwfpyf.mongodb.net/node-tutorials?retryWrites=true&w=majority'

// app.use(express.json());
// app.use(cors());

// const connectDB = async () => {

// mongoose.connect(dbURI, {
//   useNewUrlParser: true,
//   useUnifiedTopology: true,

// })
// .then(() => {
//   console.log('Connected to MongoDB');
// })
// .catch((error) => {
//   console.error('Error connecting to MongoDB', error);
// });

// const postSchema = new mongoose.Schema ({});

// const post = mongoose.model('posts',postSchema)

// const data = await post.find()
// console.warn(data);
// }

// connectDB();





// Define your MongoDB schema and models here



// Start the server
const port = process.env.PORT || 5000;

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});