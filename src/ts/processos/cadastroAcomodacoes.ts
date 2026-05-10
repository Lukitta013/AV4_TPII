import Processo from "../abstracoes/processo"
import DiretorSolteiroSimples from "../diretores/diretorSolteiroSimples"
import DiretorSolteiroMais from "../diretores/diretorSolteiroMais"
import DiretorCasalSimples from "../diretores/diretorCasalSimples"
import DiretorFamiliaSimples from "../diretores/diretorFamiliaSimples"
import DiretorFamiliaMais from "../diretores/diretorFamiliaMais"
import DiretorFamiliaSuper from "../diretores/diretorFamiliaSuper"
import Armazem from "../dominio/armazem"
import Acomodacao from "../modelos/acomodacao"

export default class CadastroAcomodacoes extends Processo {
    private acomodacoes: Acomodacao[]

    constructor() {
        super()
        this.acomodacoes = Armazem.InstanciaUnica.Acomodacoes
    }

    processar(): void {
        this.acomodacoes.push(new DiretorSolteiroSimples().construir())
        this.acomodacoes.push(new DiretorSolteiroMais().construir())
        this.acomodacoes.push(new DiretorCasalSimples().construir())
        this.acomodacoes.push(new DiretorFamiliaSimples().construir())
        this.acomodacoes.push(new DiretorFamiliaMais().construir())
        this.acomodacoes.push(new DiretorFamiliaSuper().construir())
        console.log(`${this.acomodacoes.length} tipos de acomodações carregados.`)
    }
}