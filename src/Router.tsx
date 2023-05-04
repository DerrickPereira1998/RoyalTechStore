import { BrowserRouter as  Router, Routes, Route } from "react-router-dom";
import MainPage from "./Pages/MainPage";
import styles from 'styles/App.module.scss'

function AppRouter() {
	return (
		<main className={styles.back}>
			<Router>
				<Routes>
					<Route path='/' element={<MainPage/>}></Route>
					<Route path='/carrinho' element={<MainPage/>}></Route>
					<Route path='/historico' element={<MainPage/>}></Route>
				</Routes>
			</Router>
		</main>
	);
}

export default AppRouter;

