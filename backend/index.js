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
const bodyParser = require('body-parser');
const app = express();
const cors = require("cors"); // CORS PARA UTILIZAR MULTIPLOS SERVIDORES
const bcrypt = require("bcryptjs") // BCRYPTJS PARA ENCRIPTAR DADOS
const jwt = require("jsonwebtoken") // JSW PARA CRIAR WEB TOKENS E OS COLOCAR NO SERVIDOR LOCAL
const JWT_SECRET = "derqr123131ffkfoqnlgvveiisaset()qwzq[eqweqe]erwto2h4821494534dfsghsa4gq"
app.use(bodyParser.json({ limit: '10mb' }));
app.use(bodyParser.urlencoded({ extended: true, limit: '10mb' })); //AUMENTA LIMITE DE TAMANHO DE ENVIO
app.use(cors());
app.get("/", (req, resp) => {
  resp.send("App is Working");
  // Para checar se o backend funciona,
  // acesse http://localhost:5000.
});

//CUSTOMERS
require('./models/Customers')
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
    const token = jwt.sign({ email: user.email }, JWT_SECRET, {expiresIn:86400})

    if (res.status(201)) {
      return res.json({ status: "ok", data: token })
    } else {
      return res.json({ error: "error" })
    }
  }
  res.json({ status: "error", error: "Invalid Password" })
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
    console.log('Erro ao pegar dados de cliente: ', error)
  }
})

// CADASTRO DE USUARIOS

app.post("/registerCustomer", async (req, res) => {
  const { email, name, password } = req.body
  const encryptedPassword = await bcrypt.hash(password, 5)
  try {
    const oldUser = await User.findOne({ email })
    if (oldUser) {
      return res.send({ error: "User exists" })
    }
    await User.create({
      email,
      name,
      password: encryptedPassword,
    });
    res.send({ status: "ok" });
  } catch (e) {
    res.send({ status: `error: ${e}` });
  }
});

//PRODUCTS
require('./models/Products')
const Product = mongoose.model('products');
Product.createIndexes();

//GET ALL PRODUCTS
app.get('/getAllProducts', async (req, res) => {
  try {
    const allProducts = await Product.find({});
    res.send({ status: 'ok', data: allProducts })
  } catch (e) {
    res.send({ status: 'error', data: e});
  }
})

//GET ONE PRODUCT

app.post("/getProductData", async (req, res) => {
  const { product_id } = req.body
  try {
    Product.findById(product_id)
      .then((data) => {
        res.send({ status: 'ok', data: data })
      }).catch((error) => {
        res.send({ status: 'error', data: error })
      })
  } catch (error) {
    console.log('erro ao receber produto: ', error)
  }
})

//CREATE PRODUCT

app.post("/registerProduct", async (req, res) => {
  const {imagem, titulo, descricao, preco, user_id} = req.body
  try {
    await Product.create({imagem, titulo, descricao, preco, user_id})
    res.status.send(201).json({msg: "New image uploaded!"})
  } catch (e) {
    res.send({ status: `error: ${e}` });
  }
});

//ORDERS
require('./models/Orders')
const Order = mongoose.model('orders');
Order.createIndexes();

//CREATE ORDER

app.post("/registerOrder", async (req, res) => {
  const {customer_id, product_id} = req.body
  try {
    await Order.create({customer_id, product_id})
    res.status.send(201).json({msg: "Order completed!"})
  } catch (e) {
    res.send({ status: `error: ${e}` });
  }
});

//PORT

const PORT = process.env.PORT || 5000
app.listen(PORT, '0.0.0.0', function () {
  console.log(`Servido rodando na porta ${PORT}!`)
});
