import { useState } from 'react'
import styles from './UserGet.module.scss'
import Footer from 'Components/Footer';
import { Link } from 'react-router-dom';

export default function UserGet() {

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleOnSubmit = async (e) => {
    e.preventDefault();

    fetch('http://localhost:5000/customerLogin', {
      method: "POST",
      crossDomain: true,
      body: JSON.stringify({ email, password }),
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
        "Access-Control-Allow-Origin": "*"
      },
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data, "userRegister")
        if(data.status == "ok"){
          alert("Login Aceito")
          window.localStorage("token", data.data)
          window.location.href("./teste")
        }
      })
  }

  return (
    <>
      <section className={styles.section}>
        <form action='' className={styles.form}>
          <h1 className={styles.form__title}>
            Fazer login
          </h1>
          <div className={styles.form__div}>
            <p className={styles.form__div__text}>
              Email
            </p>
            <input required type='email' className={styles.form__div__input} value={email} onChange={(e) => setEmail(e.target.value)} />
          </div>
          <div className={styles.form__div}>
            <p className={styles.form__div__text}>
              Senha
            </p>
            <input required type='password' className={styles.form__div__input} value={password} onChange={(e) => setPassword(e.target.value)} />
          </div>
          <button type='submit' className={styles.form__button} onClick={handleOnSubmit}>
            Login
          </button>
        </form>
      </section>
      <Footer />
    </>
  )
};
