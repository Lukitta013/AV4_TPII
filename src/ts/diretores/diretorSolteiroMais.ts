import ConstrutorAcomodacao from "../construtores/construtorAcomodacao";
import { NomeAcomadacao } from "../enumeracoes/NomeAcomadacao";
import Diretor from "../abstracoes/diretor";
import Acomodacao from "../modelos/acomodacao";

export default class DiretorSolteiroMais extends Diretor<Acomodacao> {
    constructor() {
        super()
        this.construtor = new ConstrutorAcomodacao()
    }
    public construir(): Acomodacao {
        let obj = this.construtor as ConstrutorAcomodacao
        obj.NomeAcomodacao = NomeAcomadacao.SolteiroMais
        obj.CamaSolteiro = 0
        obj.CamaCasal = 1
        obj.Suite = 1
        obj.Climatizacao = true
        obj.Garagem = 1
        return obj.construir()
    }
}