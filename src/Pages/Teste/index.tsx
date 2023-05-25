import axios from "axios"
import { useState } from "react"

interface Props {
  _id: String
  myFile: any
}

export default function Teste() {

  const [image, setImage] = useState<Props>({_id:"", myFile:""})

  const seeImages = () => {
    axios.get('http://localhost:5000/getAllImages')
    .then(res => setImage((res.data.data).shift()))
    .catch(err => console.log(err))
    .then(() => console.log(image))
  }

  return (
    <>
      <img src={image.myFile} alt='product'></img>
      <button onClick={seeImages}>
        See Images
      </button>
    </>
  )
};
