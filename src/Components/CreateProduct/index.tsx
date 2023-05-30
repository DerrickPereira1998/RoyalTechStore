import { useEffect, useState } from 'react';
import styles from './CreateProduct.module.scss'
import ICustomer from 'interfaces/ICustomer';
import http from 'Utils/Http';

export default function CreateProduct() {

  const [customer, setCustomer] = useState<ICustomer>({ _id: "", name: "", email: "", password: "" })
  const [image, setImage] = useState<any>("")
  const [title, setTitle] = useState<string>("")
  const [desc, setDesc] = useState<string>("")
  const [price, setPrice] = useState<string>("")

  const onFileChange = async (e: any) => {
    const file = e.target.files[0]
    const base64 = await convertToBase64(file)
    setImage(base64)
  }

  const submitFileData = async (imagem: string, titulo: string, descricao: string, preco: string, user_id: string) => {
    try {
      await http.post('registerProduct', { imagem, titulo, descricao, preco, user_id })
      console.log("file sent", imagem)
    } catch (error) {
      console.log('error on submit: ', error)
    }
  }

  function convertToBase64(file: any) {
    return new Promise((resolve, reject) => {
      const fileReader = new FileReader()
      fileReader.readAsDataURL(file)
      fileReader.onload = () => {
        resolve(fileReader.result)
      }
      fileReader.onerror = (error) => {
        reject(error)
      }
    })
  }

  useEffect(() => {
    //TOKEN RETRIVAL FUNCTION / USER LOGGED
    http.post('customerData', { token: window.localStorage.getItem("token") })
      .then(res => setCustomer(res.data.data))
      .catch(err => console.log(err))
  }, [])

  return (
    <section className={styles.section}>
      <h1 className={styles.section__title}>
        Criação de Produto
      </h1>
      <form action='' className={styles.form} onSubmit={() => submitFileData(image, title, desc, price, customer._id)}>
        <div className={styles.form__left}>
          <label htmlFor='fileinput'></label>
          <input
            id='fileinput'
            type="file"
            onChange={onFileChange}
            name='myFile'
            accept='.jpeg, .png, .jpg'
          >
          </input>
          <div id="preview"></div>
          <img src={image || ""} className={styles.img} alt='Product' />
        </div>
        <div className={styles.form__right}>
          <div>
            <label htmlFor='title' className={styles.form__label}>
              Nome
            </label><br />
            <input className={styles.form__input} id='title' required value={title} onChange={(e) => setTitle(e.target.value)} />
          </div>
          <div>
            <label htmlFor='desc' className={styles.form__label}>
              Descrição
            </label><br />
            <textarea className={styles.form__input} id='desc' required value={desc} onChange={(e) => setDesc(e.target.value)} />
          </div>
          <div>
            <label htmlFor='price' className={styles.form__label}>
              Preço
            </label><br />
            <input className={styles.form__input} id='price' required value={price} onChange={(e) => setPrice(e.target.value)} />
          </div>
          <button type='submit'>
            Criar Produto
          </button>
        </div>
      </form>
    </section>
  )
};
