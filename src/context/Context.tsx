import http from "Utils/Http";
import ICustomer from "interfaces/ICustomer";
import IProduct from "interfaces/IProduct";
import { createContext, useState } from "react";

export const Context = createContext<any>({
  customer:{ _id: "", name: "", email: "", password: ""},undefined})

export const ThemeProvider = ({children}: any) => {
  
    const [customer, setCustomer] = useState<ICustomer>({ _id: "", name: "", email: "", password: ""})
    const [products, setProducts] = useState<Array<IProduct>>([])

    return (
      <Context.Provider value={{
        customer, setCustomer, getCustomer: () => {
          http.post('customerData', { token: window.localStorage.getItem("token") })
            .then(res => setCustomer(res.data.data))
            .catch(err => console.log(err))},
        products, setProducts, getProducts: () => {
          http.get('getAllProducts')
            .then(res => setProducts(res.data.data))
            .catch(err => console.log(err))}
      }}>
        {children}
      </Context.Provider>
    )
}

