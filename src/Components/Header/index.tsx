import styles from './Header.module.scss'
import { Link, useNavigate, Outlet} from 'react-router-dom'
import { RxMagnifyingGlass, RxHamburgerMenu } from 'react-icons/rx'
import { AiOutlineShoppingCart } from 'react-icons/ai'
import logo from './Logo.png'
import { useState, useContext } from 'react'
import { Context } from 'context/Context'

export default function Header() {

  const [popup, setPopup] = useState<Boolean>(false)
  const [query, setQuery] = useState<string>('')

  const { customer, setCustomer } = useContext(Context)

  const navigate = useNavigate()

  //FUNÇÃO RESPONSAVEL PELO O HEADER EM MOBILE,
  //Se for reutilizar, pode necessitar de (overflowX: hidden) no body!
  const handleOnCLick = () => {
    const nav = document.getElementById('nav')
    const navToggle = document.getElementById('navbutton')

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

  function searchBarKeypress(e: any){
    if(e.keyCode === 13){
      navigate(`/products/${query}`)
    }
  }

  function customerNavigate(target: string){
    if(popup){
      togglePopup()
    }
    if(customer._id === ""){
      window.alert("Faça login para acessar esta funcionalidade")
    } else {
      navigate(target)
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
    navigate('/')
  }

  return (
    <>
      <header className={styles.header}>
        <img onClick={() => navigate('/')} src={logo} alt='logo do site royal tech store' className={styles.header__logo} />

        <span className={styles.header__searchbar}>
          <input 
            className={styles.header__searchbar__input} 
            placeholder={'Pesquisar produtos'} 
            value={query} 
            onChange={(e) => setQuery(e.target.value)}
            onKeyUp={(e) => searchBarKeypress(e)}
          />
          <button onClick={() => navigate(`/products/${query}`)} className={styles.header__searchbar__searchbutton}>
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
              Olá, {customer?.name} <br />
              <strong>Sua Conta</strong>
            </div>}

          {popup &&
            <>
              <div className={styles.popup} onClick={() => togglePopup()} />
              <div className={styles.popup__popupArrow} />
              <div className={styles.popup__popupInner}>
                <button className={styles.popup__popupInner__popupBtn} onClick={() => {customerNavigate('/orders')}}>Suas Compras</button>
                <button className={styles.popup__popupInner__popupBtn} onClick={() => {customerNavigate('/newproduct')}}>Criar produto</button>
                <button className={styles.popup__popupInner__popupBtn} onClick={() => {customerNavigate('/useredit')}}>Modificar conta</button>
                <button className={styles.popup__popupInner__popupBtn} onClick={logout}>Sair da conta</button>
              </div>
            </>
          }

          <div className={styles.header__nav__link} onClick={() => customerNavigate('/orders')} aria-hidden="false">
            Compras <br />
            <strong>Feitas</strong>
          </div>
          <div className={styles.header__nav__link} onClick={() => customerNavigate('/shoppingcart')} aria-hidden="false">
            <AiOutlineShoppingCart size={40} />
          </div>
        </nav>
      </header>
      <div>
        <Outlet/>
      </div>
    </>
  )
};
