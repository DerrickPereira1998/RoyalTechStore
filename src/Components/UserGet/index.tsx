import { useState } from 'react'
import styles from './UserGet.module.scss'
import { Link, useNavigate } from 'react-router-dom';
import http from 'Utils/Http';

export default function UserGet() {

  const navigate = useNavigate()

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  function timeout(delay: number) {
    return new Promise(res => setTimeout(res, delay));
  }

  const handleOnSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    http.post('customerLogin', { email, password })
      .then((res) => {
        if(res.data.status){
          window.localStorage.setItem("token", res.data.data)
          window.alert("Login efetuado com sucesso!")
          timeout(1500)
          navigate('/')
          window.location.reload()
        } else {
          window.alert("Email ou senha incorretos!")
          setEmail("")
          setPassword("")
        }
      })
      .catch(err => {
        console.log("Erro ao logar cliente", err)
      })
  }

  return (
    <section className={styles.section}>
      <form action='' className={styles.form} onSubmit={handleOnSubmit}>
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
        <button type='submit' className={styles.form__button} >
          Login
        </button>
        <span className={styles.form__notsigned}>
          <p className={styles.form__notsigned__text}>
            Não possui cadastro?
          </p>
          <Link className={styles.form__notsigned__link} to={'/usersignup'}>
            Se inscreva!
          </Link>
        </span>
      </form>
    </section>
  )
};
