const mongoose = require("mongoose");
const User = require("./user");

async function run() {
  mongoose
    .connect(
      "mongodb+srv://inotebook:inotebook46433464@cluster0.wg674vj.mongodb.net/Testing?retryWrites=true&w=majority/Testing"
    )
    .then(() => {
      console.log("Mongo DB is connected");
    });
  //   try {
  //     // const user = await User.find({name:"pallavi"});
  //     // const user = await User.findOne({ name: "pallavi" });
  //     // console.log(user);
  //     // user.sayHi();
  //     // const user = await User.exists({name:"pallavi"});
  //     // const user = await User.where("age").gt("31").where("name").equals("pallavi").limit(2).select("age")
  //     // const user = await User.where("name").equals("pallavi");
  //     // user[0].bestFriend = "64ddaa2126617cefdb7ff897";
  //     // await user[0].save();
  //     // const user = await User.where("name").equals("pallavi").populate("bestFriend")
  //     // console.log(user);

  //     const user = new User({
  //       name: "udit",
  //       age: 30,
  //       email: "test@test1.com",
  //       hobbies: ["Cricket", "Hockey"],
  //       address: { street: "5TH Main Street", city: "Jajpur" },
  //     });
  //     await user.save();
  //   } catch (e) {
  //     console.log(e);
  //   }
}

module.exports = run;

// const mongooseURI = "mongodb+srv://inotebook:inotebook46433464@cluster0.wg674vj.mongodb.net/?retryWrites=true&w=majority"
// const connectToMongo = () => {
//   mongoose.connect(mongooseURI)
//   console.log(mongoose.connection.readyState)
// };

// module.exports = connectToMongo;

// const { MongoClient } = require("mongodb");

// // Replace the uri string with your connection string.
// const uri = "mongodb+srv://inotebook:inotebook46433464@cluster0.wg674vj.mongodb.net/?retryWrites=true&w=majority";

// const client = new MongoClient(uri);

// async function run() {
//   try {
//     const database = client.db('sample_mflix');
//     const movies = database.collection('movies');

//     // Query for a movie that has the title 'Back to the Future'
//     const query = { title: 'Back to the Future' };
//     const movie = await movies.findOne(query);

//     console.log(movie);
//   }
//   finally {
//     // Ensures that the client will close when you finish/error
//     await client.close();
//   }
// }
// run().catch(console.dir);

// const { MongoClient } = require("mongodb");
// const uri =
//   "mongodb+srv://inotebook:inotebook46433464@cluster0.wg674vj.mongodb.net/?retryWrites=true&w=majority";
// // Create a MongoClient with a MongoClientOptions object to set the Stable API version
// const client = new MongoClient(uri);
// async function run() {
//   try {
//     // Connect the client to the server	(optional starting in v4.7)
//     // await client.connect();
//     // Send a ping to confirm a successful connection
//     const airbnb = client.db("sample_airbnb");
//     const bnb_col = airbnb.collection("listingsAndReviews")
//     const firstResult = await bnb_col.findOne({
//       name: "Ribeira Charming Duplex",
//     });
//     console.log(firstResult);
//   } finally {
//     // Ensures that the client will close when you finish/error
//     await client.close();
//   }
// }
// run().catch(console.dir);
