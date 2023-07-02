import { Date, ObjectId } from "mongoose"

export default interface IOrder {
    _id: string
    customer_id: string
    product_id: string
    data?: Date
}