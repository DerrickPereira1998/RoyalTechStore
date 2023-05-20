import styles from './Header.module.scss'
import { Link } from 'react-router-dom'
import { RxMagnifyingGlass, RxHamburgerMenu } from 'react-icons/rx'
import { AiOutlineShoppingCart } from 'react-icons/ai'
import logo from './Logo.png'
import ICustomer from 'interfaces/ICustomer'
import { useEffect, useState} from 'react'
import axios from 'axios'

export default function Header() {

  const [popup, setPopup] = useState<Boolean>(false)
  const [customer, setCustomer] = useState<ICustomer>({ _id: "", name: "", email: "", password: "" })

  const navToggle = document.getElementById('navbutton')
  const nav = document.getElementById('nav')

  //Se for reutilizar, pode necessitar de (overflowX: hidden) no body!
  function handleOnCLick() {
    const visibility = nav?.getAttribute("data-visible")
    if (visibility === "true") {
      nav?.setAttribute('data-visible', 'false')
      navToggle?.setAttribute('aria-expanded', 'false')
    }
    else {
      nav?.setAttribute('data-visible', 'true')
      navToggle?.setAttribute('aria-expanded', 'true')
    }
  }

  //POPUP TOGGLE FUNCTION
  function togglePopup() {
    setPopup(!popup)
  }

  const logout = () => {
    window.localStorage.clear()
    togglePopup()
    setCustomer({ _id: "", name: "", email: "", password: "" })
  }

  useEffect(() => {
    //TOKEN RETRIVAL FUNCTION / USER LOGGED
    axios.post('http://localhost:5000/customerData', {token: window.localStorage.getItem("token")})
      .then(res => setCustomer(res.data.data))
      .catch(err => console.log(err))
  }, [])

  return (
    <header className={styles.header}>
      <img src={logo} alt='logo do site royal tech store' className={styles.header__logo}/>

      <span className={styles.header__searchbar}>
        <input className={styles.header__searchbar__input} placeholder={'Pesquisar itens'}></input>
        <button className={styles.header__searchbar__search}>
          <RxMagnifyingGlass color='black' size={20} />
        </button>
      </span>

      <RxHamburgerMenu
        id='navbutton'
        size={20}
        onClick={handleOnCLick}
        aria-controls='nav'
        aria-expanded='false'
        className={styles.header__button}
      />

      <nav className={styles.header__nav} id='nav' data-visible='false'>
        {customer?._id === "" ?
          <Link className={styles.header__nav__link} to={'/userlogin'} aria-hidden="false">
            Login
          </Link> :
          <div className={styles.header__nav__link} aria-hidden="false" onClick={() => togglePopup()}>
            Olá, {customer?.name} <br/>
            <strong>Sua Conta</strong>
          </div>}

        {popup &&
          <>
            <div className={styles.popup} onClick={() => togglePopup()} />
            <div className={styles.popup__popupArrow} />
            <div className={styles.popup__popupInner}>
              <button className={styles.popup__popupInner__popupBtn}>Meus produtos</button>
              <button className={styles.popup__popupInner__popupBtn}>Comentários feitos</button>
              <button className={styles.popup__popupInner__popupBtn}>Modificar conta</button>
              <button className={styles.popup__popupInner__popupBtn} onClick={logout}>Sair da conta</button>
            </div>
          </>
        }

        <Link className={styles.header__nav__link} to={'/compras'} aria-hidden="false">
          Compras <br/>
          <strong>Feitas</strong>
        </Link>
        <Link className={styles.header__nav__link} to={'/carrinho'} aria-hidden="false">
          <AiOutlineShoppingCart size={40} />
        </Link>
      </nav>
    </header>
  )
};
