import Acomodacao from "./acomodacao"
import Cliente from "./cliente"

export default class Hospedagem {
    private cliente: Cliente
    private acomodacao: Acomodacao
    private dataEntrada: Date

    constructor(cliente: Cliente, acomodacao: Acomodacao) {
        this.cliente = cliente
        this.acomodacao = acomodacao
        this.dataEntrada = new Date()
    }

    public get Cliente() { return this.cliente }
    public get Acomodacao() { return this.acomodacao }
    public get DataEntrada() { return this.dataEntrada }
}