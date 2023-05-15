import styles from './Header.module.scss'
import { Link } from 'react-router-dom'
import { RxMagnifyingGlass, RxHamburgerMenu } from 'react-icons/rx'
import { AiOutlineShoppingCart } from 'react-icons/ai'
import logo from './Logo.png'

export default function Header() {
  
  const navToggle = document.getElementById('navbutton')
  const nav = document.getElementById('nav')

  //Se for reutilizar, pode necessitar de (overflowX: hidden) no body!
  function handleOnCLick() {
    const visibility = nav?.getAttribute("data-visible")
    if(visibility === "true"){
      nav?.setAttribute('data-visible', 'false')
      navToggle?.setAttribute('aria-expanded', 'false')
    }
    else{
      nav?.setAttribute('data-visible', 'true')
      navToggle?.setAttribute('aria-expanded', 'true')
    }
  }

  return (
    <header className={styles.header}>
      <img src={logo} alt='logo do site royal tech store' className={styles.header__logo} />
      
      <span className={styles.header__searchbar}>
        <input className={styles.header__searchbar__input} placeholder={'Pesquisar itens'}>

        </input>
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
        <a className={styles.header__nav__link} href={'/userlogin'} aria-hidden="false">
          Login
        </a>
        <a className={styles.header__nav__link} href={'/compras'} aria-hidden="false">
          Compras
        </a>
        <a className={styles.header__nav__link} href={'/carrinho'} aria-hidden="false">
          <AiOutlineShoppingCart size={40} />
        </a>
      </nav>
    </header>
  )
};
