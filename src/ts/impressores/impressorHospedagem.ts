import Impressor from "../interfaces/impressor"
import Hospedagem from "../modelos/hospedagem"

export default class ImpressorHospedagem implements Impressor {
    private hospedagem: Hospedagem

    constructor(hospedagem: Hospedagem) {
        this.hospedagem = hospedagem
    }

    imprimir(): string {
        return `****************************\n`
            + `| Hóspede: ${this.hospedagem.Cliente.Nome}\n`
            + `| Nome social: ${this.hospedagem.Cliente.NomeSocial}\n`
            + `| Acomodação: ${this.hospedagem.Acomodacao.NomeAcomadacao}\n`
            + `| Check-in: ${this.hospedagem.DataEntrada.toLocaleDateString()}\n`
            + `****************************`
    }
}