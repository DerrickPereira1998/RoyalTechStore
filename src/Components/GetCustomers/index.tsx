import { useEffect, useState } from "react"
import ICustomer from "../../interfaces/ICustomer"


export default function GetCustomers() {
  
  const [customers, setCustomers] = useState([])

    useEffect(() => {
      fetch(
        'http://localhost:5000/getAllCustomers', {
          method: "GET"
        })
          .then((res) => res.json())
          .then((data) => {
            setCustomers(data.data)
          })
    },[])
  
  return(
    <section>
      {customers.map((customer: ICustomer) => {
        return(
          <ul>
            <li>{customer.name}</li>
            <li>{customer.password}</li>
          </ul>
        )
      })}
    </section>
  )
};
