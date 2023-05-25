import { useState } from 'react'
import styles from './UserPost.module.scss'
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';

export default function UserPost() {

  const navigate = useNavigate()

  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("")

  const handleOnSubmit = async (e: any) => {
    e.preventDefault();
    try {
      await axios.post('http://localhost:5000/registerCustomer', { email, name, password })
    } 
    catch (error) {
      console.log('error on submit: ', error)
    }
    setPassword("");
    setName("");
    setEmail("")
    navigate('/teste')
  }

  return (
    <>
      <section className={styles.section}>
        <form action='' className={styles.form} onSubmit={handleOnSubmit}>
          <h1 className={styles.form__title}>
            Criar conta
          </h1>
          <div className={styles.form__div}>
            <p className={styles.form__div__text}>
              Email
            </p>
            <input required type="email" className={styles.form__div__input} value={email} onChange={(e) => setEmail(e.target.value)} />
          </div>
          <div className={styles.form__div}>
            <p className={styles.form__div__text}>
              Nome
            </p>
            <input required type='text' className={styles.form__div__input} value={name} onChange={(e) => setName(e.target.value)} />
          </div>
          <div className={styles.form__div}>
            <p className={styles.form__div__text}>
              Senha
            </p>
            <input required type='password' className={styles.form__div__input} value={password} onChange={(e) => setPassword(e.target.value)} />
          </div>
          <button type='submit' className={styles.form__button}>
            Continuar
          </button>
          <span className={styles.form__signed}>
        <p className={styles.form__signed__text}>
          Já possui cadastro?
        </p>
        <Link className={styles.form__signed__link} to={'/userlogin'}>
          Fazer Login
        </Link>
      </span>
        </form>
      </section>
    </>
  )
};
