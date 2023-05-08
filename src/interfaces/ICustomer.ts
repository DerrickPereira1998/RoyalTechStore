import { ObjectId } from "mongodb"

export default interface ICustomer {
    _id: String
    name: String
    password: String
    email: String
}