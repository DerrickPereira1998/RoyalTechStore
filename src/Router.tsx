import styles from 'styles/App.module.scss'
import { useEffect,  useContext } from 'react'
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import ProductsList from 'Components/ProductsList';
import Header from 'Components/Header';
import Footer from 'Components/Footer';
import ProductDetails from 'Components/ProductDetails';
import { Context } from 'context/Context'
import MainPage from 'Components/MainPage';
import Orders from 'Components/Orders';
import ShoppingCart from 'Components/ShoppingCart';
import UserEdit from 'Components/UserEdit';
import CreateProduct from 'Components/CreateProduct';
import UserPost from 'Components/UserPost';
import UserGet from 'Components/UserGet';

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
            <Route path='newproduct' element={<CreateProduct />}></Route>
            <Route path='products' element={<ProductsList />}></Route>
            <Route path='orders' element={<Orders />}></Route>
            <Route path='shoppingcart' element={<ShoppingCart/>}></Route>
            <Route path='products/:query' element={<ProductsList />}></Route>
            <Route path='product/:product_id' element={<ProductDetails/>}></Route>
          </Route>
          <Route path='/useredit' element={<UserEdit />}></Route>
          <Route path='/userlogin' element={<UserGet />}></Route>
          <Route path='/usersignup' element={<UserPost />}></Route>
        </Routes>
        <Footer />
      </Router>
    </main>
  );
}

export default AppRouter;

