import ICustomer from "interfaces/ICustomer";
import { useEffect, useState } from "react"
import customerToken from "Utils/customerToken";
import styles from './Teste.module.scss'

export default function Teste() {

  const [customer, setCustomer] = useState<ICustomer>()

  //FUNÇÃO QUE PEGA OS VALORES DO TOKEN 
  async function token() {
    const object = await customerToken();
    const names = Object.values(object);
    const user: ICustomer = ({
      _id: names[1]._id,
      email: names[1].email,
      name: names[1].name,
      password: names[1].password
    })
    setCustomer(user)
  }

  useEffect(() => {
    token()
  }, [])

  return (
    <div className={styles.div}>
      email: {customer?.email} nome: {customer?.name} _id: {customer?._id}
    </div>
  )
};
