import styles from './Header.module.scss'
import { Link } from 'react-router-dom'
import { RxMagnifyingGlass } from 'react-icons/rx'
import { AiOutlineShoppingCart } from 'react-icons/ai'
import logo from './Logo.png'

export default function Header() {
  return (
    <header className={styles.header}>
      <img src={logo} alt='logo do site royal tech store' className={styles.header__logo} />
      <span className={styles.header__searchbar}>
        <input className={styles.header__searchbar__input} placeholder={'Pesquisar itens'}>

        </input>
        <button className={styles.header__searchbar__button}>
          <RxMagnifyingGlass color='black' size={20} />
        </button>
      </span>
      <div className={styles.header__div} />
      <Link className={styles.header__login} to={'/login'}>
        Entrar
      </Link>
      <Link className={styles.header__shoppingcart} to='/carrinho'>
        <AiOutlineShoppingCart size={40} />
      </Link>
    </header>
  )
};
