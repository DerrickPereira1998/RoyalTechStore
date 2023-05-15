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
      console.log("MongoDB conectado localmente na porta 5000!");
    })
    .catch((err) => {
      console.log("Erro ao conectar ao Mongo: " + err);
    });
}

// For backend and express
const express = require('express'); //EXPRESS
const app = express();
const cors = require("cors"); // CORS PARA UTILIZAR MULTIPLOS SERVIDORES
const bcrypt = require("bcryptjs") // BCRYPTJS PARA ENCRIPTAR DADOS
const jwt = require("jsonwebtoken") // JSW PARA CRIAR WEB TOKENS E OS COLOCAR NO SERVIDOR LOCAL
const JWT_SECRET = "derqr123131ffkfoqnlgvveiisaset()qwzq[eqweqe]erwto2h4821494534dfsghsa4gq"
app.use(express.json());
app.use(cors());
app.get("/", (req, resp) => {

  resp.send("App is Working");
  // You can check backend is working or not by
  // entering http://loacalhost:5000

  // If you see App is working means
  // backend working properly
});

//CUSTOMERS

require('./models/Customer')
const User = mongoose.model('customers');
User.createIndexes();

// LOGIN DE USUARIOS

app.post('/customerLogin', async (req, res) => {
  const { email, password } = req.body;

  //RETORNA SE O EMAIL JA FOI CADASTRADO
  const user = await User.findOne({ email })
  if (!user) {
    return res.json({ error: 'User not found' })
  }
  if (await bcrypt.compare(password, user.password)) {
    // CRIAÇÃO DE DADOS DO USUARIO NO LOCAL STORAGE
    const token = jwt.sign({ email: user.email }, JWT_SECRET)

    if (res.status(201)) {
      return res.json({ status: "ok", data: token })
    } else {
      return res.json({ error: "error" })
    }
  }
  res.json({ status: "error", error: "Invalid Password" })
})

app.get('/getAllCustomers', async (req, res) => {
  try {

    const allCustomers = await User.find({});
    res.send({ status: 'ok', data: allCustomers })

  } catch (e) {
    resp.send("Error when getting all customers");
  }
})

// PEGAR DADOS DE USUARIO USANDO LOCAL STORAGE

app.post("/customerData", async (req, res) => {
  const { token } = req.body
  try {
    const user = jwt.verify(token, JWT_SECRET)
    const userEmail = user.email
    User.findOne({ email: userEmail })
      .then((data) => {
        res.send({ status: 'ok', data: data })
      }).catch((error) => {
        res.send({ status: 'error', data: error })
      })
  } catch (error) {

  }
})

// CADASTRO DE USUARIOS

app.post("/registerCustomer", async (req, res) => {
  const { email, name, password } = req.body
  const encryptedPassword = await bcrypt.hash(password, 5)
  try {
    const oldUser = await User.findOne({ email })
    console.log(email)
    if (oldUser) {
      return res.send({ error: "User exists" })
    }
    await User.create({
      email,
      name,
      password: encryptedPassword,
    });
    console.log(encryptedPassword)
    res.send({ status: "ok" });
  } catch (e) {
    res.send({ status: `error: ${e}` });
  }
});

//ITENS

require('./models/Products')
const Product = mongoose.model('customers');
Product.createIndexes();

app.get('/getAllProducts', async (req, res) => {
  try {
    const allProducts = await Product.find({});
    res.send({ status: 'ok', data: allProducts })

  } catch (e) {
    resp.send("Error when getting all customers");
  }
})

//PORT

const PORT = process.env.PORT || 5000
app.listen(PORT, '0.0.0.0', function () {
  console.log('Servido rodando!')
});
