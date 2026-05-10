import Processo from "../abstracoes/processo"
import Armazem from "../dominio/armazem"
import Hospedagem from "../modelos/hospedagem"
import Acomodacao from "../modelos/acomodacao"
import Cliente from "../modelos/cliente"
import ImpressorAcomodacao from "../impressores/impressorAcomodacao"

export default class CadastroHospedagem extends Processo {
    processar(): void {
        console.clear()
        console.log('=== Registrar Hóspede (Check-in) ===')
        let armazem = Armazem.InstanciaUnica

        let titulares = armazem.Clientes.filter((c: Cliente) => c.Titular == undefined)
        if (titulares.length === 0) {
            console.log('Nenhum cliente titular cadastrado.')
            return
        }
        console.log('\nClientes titulares disponíveis:')
        titulares.forEach((c, i) => console.log(`${i + 1} - ${c.Nome}`))

        let idxCliente = this.entrada.receberNumero('Qual cliente deseja hospedar?') - 1
        if (idxCliente < 0 || idxCliente >= titulares.length) {
            console.log('Opção inválida.')
            return
        }
        let cliente = titulares[idxCliente]

        let jaHospedado = armazem.Hospedagens.find(
            (h: Hospedagem) => h.Cliente === cliente
        )
        if (jaHospedado) {
            console.log(`${cliente.Nome} já está hospedado(a)!`)
            return
        }

        let acomodacoes = armazem.Acomodacoes
        if (acomodacoes.length === 0) {
            console.log('Nenhuma acomodação disponível.')
            return
        }
        console.log('\nAcomodações disponíveis:')
        let impressor = new ImpressorAcomodacao(acomodacoes[0])
        acomodacoes.forEach((a: Acomodacao, i: number) => {
            impressor = new ImpressorAcomodacao(a)
            console.log(`${i + 1} - ${impressor.imprimir()}`)
        })

        let idxAcom = this.entrada.receberNumero('Qual acomodação?') - 1
        if (idxAcom < 0 || idxAcom >= acomodacoes.length) {
            console.log('Opção inválida.')
            return
        }
        let acomodacao = acomodacoes[idxAcom]

        let hospedagem = new Hospedagem(cliente, acomodacao)
        armazem.Hospedagens.push(hospedagem)
        console.log(`\nCheck-in de ${cliente.Nome} realizado com sucesso!`)
        console.log(`Acomodação: ${acomodacao.NomeAcomadacao}`)
    }
}