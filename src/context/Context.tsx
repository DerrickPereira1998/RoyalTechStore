import http from "Utils/Http";
import ICustomer from "interfaces/ICustomer";
import { createContext, useState } from "react";

export const Context = createContext<any>({
  customer: { _id: "", name: "", email: "", password: "" }, undefined
})

export const ThemeProvider = ({ children }: any) => {

  const [customer, setCustomer] = useState<ICustomer>({ _id: "", name: "", email: "", password: "" })

  var token = window.localStorage.getItem('token') || ''

  const getCustomer = () => {
    if(token !== ''){
      http.post('customerData', { token: window.localStorage.getItem("token") })
        .then((res) => {
          if(res.data.data === "token expired"){
            window.localStorage.clear()
            setCustomer({ _id: "", name: "", email: "", password: "" })
          } else {
            setCustomer(res.data.data)
          }
        })
        .catch(err => console.log(err))
    }
  }

  return (
    <Context.Provider value={{
      customer, setCustomer, getCustomer: getCustomer,
    }}>
      {children}
    </Context.Provider>
  )
}

