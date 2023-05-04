// To connect with your mongoDB database

const mongoose = require('mongoose')

mongoose.Promise = global.Promise;
if (process.env.NODE_ENV == "production") { // PARA OUTROS AMBIENTES
  const DB_USER = 'derrickpereira1998'
  const DB_PASSWORD = encodeURIComponent('videogame')
  mongoose.connect(`mongodb+srv://${DB_USER}:${DB_PASSWORD}@derrick.kuoqczt.mongodb.net/OnlineStore?retryWrites=true&w=majority`, {
    useNewUrlParser: true,
    useUnifiedTopology: true
  })
    .then(() => {
      console.log("MongoDB conectado!");
    })
    .catch((err) => {
      console.log("Erro ao conectar ao Mongo: " + err);
    });
}
else { //PARA SERVIDOR LOCAL
  const DB_USER = 'derrickpereira1998'
  const DB_PASSWORD = encodeURIComponent('videogame')
  mongoose.connect(`mongodb+srv://${DB_USER}:${DB_PASSWORD}@derrick.kuoqczt.mongodb.net/OnlineStore?retryWrites=true&w=majority`, {
    useNewUrlParser: true,
    useUnifiedTopology: true
  })
    .then(() => {
      console.log("MongoDB conectado localmente!");
    })
    .catch((err) => {
      console.log("Erro ao conectar ao Mongo: " + err);
    });
}

const Customers = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true
  }
}, { collection: 'Customers', versionKey: false }
);
const User = mongoose.model('Customers', Customers);
User.createIndexes();

// For backend and express
const express = require('express');
const app = express();
const cors = require("cors");
console.log("App listen at port 5000");
app.use(express.json());
app.use(cors());
app.get("/", (req, resp) => {

  resp.send("App is Working");
  // You can check backend is working or not by
  // entering http://loacalhost:5000

  // If you see App is working means
  // backend working properly
});

app.get('/getAllCustomers', async (req,res) => {
  try {
    const allCustomers = await User.find({});
    res.send({status:'ok',data: allCustomers})

  } catch (e) {
    resp.send("Error when getting all customers");
  }
})

app.post("/register", async (req, resp) => {
  try {
    const user = new User(req.body);
    let result = await user.save();
    result = result.toObject();
    if (result) {
      delete result.password;
      resp.send(req.body);
      console.log(result);
    } else {
      console.log("User already register");
    }

  } catch (e) {
    resp.send("Something Went Wrong");
  }
});

const PORT = process.env.PORT || 5000
app.listen(PORT, '0.0.0.0', function () {
  console.log('Servido rodando!')
});
