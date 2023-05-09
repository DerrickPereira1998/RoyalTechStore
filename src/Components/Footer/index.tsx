import { Link } from 'react-router-dom'
import styles from './Footer.module.scss'

export default function Footer() {
  return(
    <footer className={styles.footer}>
      <div>
        Copyright © 2023 Derrick Pereira |
      </div>
      <Link to={'/contato'}  className={styles.footer__contato}>
        Contato
      </Link>
    </footer>
  )
};
