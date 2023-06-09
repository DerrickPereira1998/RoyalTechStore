export default interface IProduct {
    _id: string
    imagem: string
    titulo: string
    descricao: string
    preco: string
    nota?: Number
    user_id?: string
    data?: Date
}