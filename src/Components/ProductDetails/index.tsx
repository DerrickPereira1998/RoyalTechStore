import { useParams } from 'react-router-dom'
import styles from './ProductDetails.module.scss'
import { useEffect, useState } from 'react'
import IProduct from 'interfaces/IProduct'
import http from 'Utils/Http'

export default function ProductDetails() {

  const {product_id} = useParams()

  const [product, setProduct] = useState<IProduct>()

  useEffect(() =>{
    http.post('getProductData', {product_id})
    .then(res => setProduct(res.data.data))
    .catch(err => console.log('erro ao pegar produto: ',err))
  }, [product_id])

  return(
    <>
      <p>
        Produto: {product?.titulo}
      </p>
      <img src={product?.imagem} alt='Imagem do Produto'/>
    </>
  )
};
