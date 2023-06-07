import { useState, useContext } from 'react'
import { useNavigate } from 'react-router-dom';
import styles from './CreateProduct.module.scss'
import http from 'Utils/Http';
import noImageJpg from 'img/No-Image.jpg'
import {priceMask} from 'Utils/Mask';
import { CustomerContext } from 'context/CustomerContext'

export default function CreateProduct() {

  const { customer } = useContext(CustomerContext)
  const [imageName, setImageName] = useState<string>("Escolha a imagem")
  const [image, setImage] = useState<any>("")
  const [title, setTitle] = useState<string>("")
  const [desc, setDesc] = useState<string>("")
  const [price, setPrice] = useState<string>("")

  const [imageErr, setImageErr] = useState<any>("")
  const [priceErr, setPriceErr] = useState<any>("")

  const navigate = useNavigate()

  const handleprice = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPrice(e.target.value)
    console.log(price)
  }

  const onFileChange = async (e: any) => {
    const file = e.target.files[0]
    setImageName(e.target.files[0].name)
    const base64 = await convertToBase64(file)
    setImage(base64)
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

  const submitFileData = async (e:any ,imagem: string, titulo: string, descricao: string, preco: string, user_id: string) => {
    e.preventDefault()
    if(image !== '' && price.length >= 4){
      try {
        await http.post('registerProduct', { imagem, titulo, descricao, preco, user_id })
        console.log("file sent", imagem)
        navigate('/')
      } catch (error) {
        console.log('error on submit: ', error)
      }
    } else{
      if(image === ''){
        setImageErr('selecione uma imagem')
      } else{
        setImageErr('')
      }
      if(price.length <= 3){
        setPriceErr('O preço deve ser maior ou igual a R$ 1.00')
      } else{
        setPriceErr('')
      }
    }
  }

  return (
    <section className={styles.section}>
      <h1 className={styles.section__title}>
        Criação de Produto
      </h1>
      <form action='' className={styles.form} onSubmit={(e) => submitFileData(e,image, title, desc, price, customer._id)}>
        <div className={styles.form__left}>
          <label htmlFor='fileinput' className={styles.form__left__filelabel}>
            {imageName}
          </label>
          <input
            id='fileinput'
            type="file"
            onChange={onFileChange}
            name='myFile'
            accept='.jpeg, .png, .jpg'
            className={styles.form__left__fileinput}
          /> 
          <div id="preview"></div>
          <img src={image || noImageJpg} className={styles.img} alt='Product' />
          {imageErr !== '' && <p className={styles.form__err}>{imageErr}</p>}
        </div>
        <div className={styles.form__right}>
          <div className={styles.form__right__div}>
            <label htmlFor='title' className={styles.form__right__div__label}>
              Nome
            </label>
            <input placeholder='Nome' className={styles.form__right__div__input} id='title' required value={title} onChange={(e) => setTitle(e.target.value)} />
          </div>
          <div className={styles.form__right__div}>
            <label htmlFor='desc' className={styles.form__right__div__label}>
              Descrição
            </label>
            <textarea placeholder='Descrição' className={styles.form__right__div__input} id='desc' required value={desc} onChange={(e) => setDesc(e.target.value)} />
          </div>
          <div className={styles.form__right__div}>
            <label htmlFor='price' className={styles.form__right__div__label}>
              Preço
            </label>
            <input placeholder='Preço' className={styles.form__right__div__input} id='price' required value={price} onChange={(e) => handleprice(priceMask(e))} />
            {priceErr !== '' && <p className={styles.form__err}>{priceErr}</p>}
          </div>
          <button type='submit' className={styles.submitbutton}>
            Criar Produto
          </button>
        </div>
      </form>
    </section>
  )
};
