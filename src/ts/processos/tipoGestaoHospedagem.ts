import Processo from "../abstracoes/processo"
import MenuHospedagem from "../menus/menuHospedagem"
import CadastroHospedagem from "./cadastroHospedagem"
import ListagemHospedagens from "./listagemHospedagens"
import CheckOutHospedagem from "./checkOutHospedagem"

export default class TipoGestaoHospedagem extends Processo {
    constructor() {
        super()
        this.menu = new MenuHospedagem()
        this.execucao = true
    }
    processar(): void {
        while (this.execucao) {
            this.menu.mostrar()
            this.opcao = this.entrada.receberNumero('Qual opção desejada?')
            switch (this.opcao) {
                case 1:
                    this.processo = new CadastroHospedagem()
                    this.processo.processar()
                    break
                case 2:
                    this.processo = new ListagemHospedagens()
                    this.processo.processar()
                    break
                case 3:
                    this.processo = new CheckOutHospedagem()
                    this.processo.processar()
                    break
                case 0:
                    this.execucao = false
                    break
                default:
                    console.log('Opção não entendida :(')
            }
        }
    }
}