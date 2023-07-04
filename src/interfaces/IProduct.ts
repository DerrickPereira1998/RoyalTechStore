export default interface IProduct {
    _id: string
    imagem: string
    titulo: string
    descricao: string
    preco: string
    user_id?: string
    data?: Date
}