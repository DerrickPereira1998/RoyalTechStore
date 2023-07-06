import { Date } from "mongoose"
import IProduct from "./IProduct"

export default interface IShoppingCart {
  _id: string
  customer_id: string
  product_id: string
  product: Array<IProduct>
}