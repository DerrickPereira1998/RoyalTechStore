import { useState } from 'react'
import styles from './UserPost.module.scss'
import Footer from 'Components/Footer';

export default function UserPost() {

  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("")

  const handleOnSubmit = async (e: any) => {
    e.preventDefault();

    let result = await fetch(
      'http://localhost:5000/registerCustomer', {
      method: "POST",
      
      body: JSON.stringify({ email, name, password }),
      headers: {
        'Content-Type': 'application/json'
      }
    })
    result = await result.json();
    if (result) {
      alert("Data saved succesfully");
      setPassword("");
      setName("");
      setEmail("")
    }
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
        </form>
      </section>
      <Footer />
    </>
  )
};
