import styles from 'styles/App.module.scss'
import { BrowserRouter as  Router, Routes, Route } from "react-router-dom";
import MainPage from "./Pages/MainPage";
import UserPage from "Pages/UserLogin";
import UserSignUp from 'Pages/UserSignUp';
import Teste from 'Pages/Teste';

function AppRouter() {
	return (
		<main className={styles.back}>
			<Router>
				<Routes>
					<Route path='/' element={<MainPage/>}></Route>
					<Route path='/userlogin' element={<UserPage/>}></Route>
					<Route path='/usersignup' element={<UserSignUp/>}></Route>
					<Route path='/teste' element={<Teste/>}></Route>
				</Routes>
			</Router>
		</main>
	);
}

export default AppRouter;

