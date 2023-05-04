import { ObjectId } from "mongodb"

export default interface ICustomer {
    _id: ObjectId
    name: string
    password: string
}