import Processo from "../abstracoes/processo"
import Armazem from "../dominio/armazem"
import ImpressorHospedagem from "../impressores/impressorHospedagem"
import Hospedagem from "../modelos/hospedagem"

export default class ListagemHospedagens extends Processo {
    processar(): void {
        console.clear()
        console.log('=== Hóspedes Atualmente Hospedados ===')
        let hospedagens = Armazem.InstanciaUnica.Hospedagens

        if (hospedagens.length === 0) {
            console.log('Nenhum hóspede no momento.')
            return
        }

        hospedagens.forEach((h: Hospedagem) => {
            let impressor = new ImpressorHospedagem(h)
            console.log(impressor.imprimir())
        })
    }
}