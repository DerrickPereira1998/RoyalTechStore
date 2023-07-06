import styles from 'styles/App.module.scss'
import { useEffect,  useContext } from 'react'
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import UserPage from "Pages/UserLogin";
import UserSignUp from 'Pages/UserSignUp';
import MyProducts from 'Pages/MyProducts';
import NewProduct from 'Pages/NewProduct';
import ProductsList from 'Components/ProductsList';
import Header from 'Components/Header';
import Footer from 'Components/Footer';
import ProductDetails from 'Components/ProductDetails';
import { Context } from 'context/Context'
import MainPage from 'Components/MainPage';
import Orders from 'Components/Orders';
import ShoppingCart from 'Components/ShoppingCart';

function AppRouter() {

  const {getCustomer} = useContext(Context)

  useEffect(() => {
    //TOKEN RETRIVAL FUNCTION / USER LOGGED
    getCustomer()
  }, [])

  return (
    <main className={styles.back}>
      <Router>
        <Routes>
          <Route path='/' element={<Header/>}>
            <Route index element={<MainPage/>}></Route>
            <Route path='myproducts' element={<MyProducts />}></Route>
            <Route path='newproduct' element={<NewProduct />}></Route>
            <Route path='products' element={<ProductsList />}></Route>
            <Route path='orders' element={<Orders />}></Route>
            <Route path='shoppingcart' element={<ShoppingCart/>}></Route>
            <Route path='products/:query' element={<ProductsList />}></Route>
            <Route path='product/:product_id' element={<ProductDetails/>}></Route>
          </Route>
          <Route path='/userlogin' element={<UserPage />}></Route>
          <Route path='/usersignup' element={<UserSignUp />}></Route>
        </Routes>
        <Footer />
      </Router>
    </main>
  );
}

export default AppRouter;

