import styles from 'styles/App.module.scss'
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import MainPage from "./Pages/MainPage";
import UserPage from "Pages/UserLogin";
import UserSignUp from 'Pages/UserSignUp';
import MyProducts from 'Pages/MyProducts';
import NewProduct from 'Pages/NewProduct';
import Products from 'Pages/Products';
import Header from 'Components/Header';
import Footer from 'Components/Footer';

function AppRouter() {
  return (
    <main className={styles.back}>
      <Router>
        <Routes>
          <Route path='/' element={<Header/>}>
            <Route index element={<MainPage />}></Route>
            <Route path='myproducts' element={<MyProducts />}></Route>
            <Route path='newproduct' element={<NewProduct />}></Route>
            <Route path='products' element={<Products />}></Route>
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

