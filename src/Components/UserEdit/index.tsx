import { useState, useContext } from 'react'
import { Context } from 'context/Context'
import styles from './UserPost.module.scss'
import { Link, useNavigate } from 'react-router-dom';
import http from 'Utils/Http';
import { validateName } from 'Utils/Regex'

export default function UserEdit() {

  const navigate = useNavigate()
  const { customer, setCustomer } = useContext(Context)

  const [name, setName] = useState(customer.name);
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState(customer.email)

  const [nameErr, setNameErr] = useState("");
  const [passwordErr, setPasswordErr] = useState("");

  const handleOnSubmit = async (e: any) => {
    e.preventDefault();
    if (validateName.test(name) && password.length > 6) {
      try {
        await http.post('editCustomer', {customer_id: customer._id, email, name, password })
      }
      catch (error) {
        console.log('error on submit: ', error)
      }

      setPassword("");
      setName("");
      setEmail("")
      window.localStorage.clear()
      setCustomer({ _id: "", name: "", email: "", password: "" })
      navigate('/userlogin')
    } else {
      if(!validateName.test(name)){
        setNameErr('O nome deve ter de 3 a 12 letras, contendo letras ou espaços.')
      }else{
        setNameErr('')
      }
      if(password.length <= 6){
        setPasswordErr('A senha deve conter no minimo 6 caracteres')
      } else{
        setPasswordErr('')
      }
    }

  }

  return (
    <>
      <section className={styles.section}>
        <form action='' className={styles.form} onSubmit={handleOnSubmit}>
          <h1 className={styles.form__title}>
            Editar conta
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
            {nameErr !== '' && <p className={styles.form__div__err}>{nameErr}</p>}
          </div>
          <div className={styles.form__div}>
            <p className={styles.form__div__text}>
              Nova senha
            </p>
            <input required type='password' className={styles.form__div__input} value={password} onChange={(e) => setPassword(e.target.value)} />
            {passwordErr !== '' && <p className={styles.form__div__err}>{passwordErr}</p>}
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
