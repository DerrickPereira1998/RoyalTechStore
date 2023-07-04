import { Date } from "mongoose"
import IProduct from "./IProduct"

export default interface IOrder {
  _id: string
  customer_id: string
  product_id: string
  date: Date
  product: Array<IProduct>
}