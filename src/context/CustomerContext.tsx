import http from "Utils/Http";
import ICustomer from "interfaces/ICustomer";
import { createContext, useState } from "react";

export const CustomerContext = createContext<any>({
  customer:{ _id: "", name: "", email: "", password: ""}, undefined})

export const ThemeProvider = ({children}: any) => {
  
    const [customer, setCustomer] = useState<ICustomer>({ _id: "", name: "", email: "", password: ""})

    return (
      <CustomerContext.Provider value={{customer, setCustomer, getCustomer: function getCustomer() {
        http.post('customerData', { token: window.localStorage.getItem("token") })
        .then(res => setCustomer(res.data.data))
        .catch(err => console.log(err))
      }}}>
        {children}
      </CustomerContext.Provider>
    )
}

