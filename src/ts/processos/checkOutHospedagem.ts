import Processo from "../abstracoes/processo"
import Armazem from "../dominio/armazem"
import Hospedagem from "../modelos/hospedagem"

export default class CheckOutHospedagem extends Processo {
    processar(): void {
        console.clear()
        console.log('=== Check-out de Hóspede ===')
        let armazem = Armazem.InstanciaUnica
        let hospedagens = armazem.Hospedagens

        if (hospedagens.length === 0) {
            console.log('Nenhum hóspede para realizar check-out.')
            return
        }

        console.log('\nHóspedes atuais:')
        hospedagens.forEach((h: Hospedagem, i: number) => {
            console.log(`${i + 1} - ${h.Cliente.Nome} | ${h.Acomodacao.NomeAcomadacao}`)
        })

        let idx = this.entrada.receberNumero('Qual hóspede deseja fazer check-out?') - 1
        if (idx < 0 || idx >= hospedagens.length) {
            console.log('Opção inválida.')
            return
        }

        let hospedagem = hospedagens[idx]
        let confirmacao = this.entrada.receberTexto(
            `Confirma o check-out de ${hospedagem.Cliente.Nome}? (s/n)`
        )
        if (confirmacao.toLowerCase() !== 's') {
            console.log('Operação cancelada.')
            return
        }

        armazem.Hospedagens.splice(idx, 1)
        console.log(`\nCheck-out de ${hospedagem.Cliente.Nome} realizado com sucesso!`)
    }
}