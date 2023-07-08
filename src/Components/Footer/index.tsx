import styles from './Footer.module.scss'

export default function Footer() {
  return(
    <footer className={styles.footer}>
      <div>
        Copyright © 2023 Derrick Pereira |
      </div>
      <a href='https://portfolio-git-master-derrickpereira1998.vercel.app/' target='blank' className={styles.footer__contato}>
        Contato
      </a>
    </footer>
  )
};
