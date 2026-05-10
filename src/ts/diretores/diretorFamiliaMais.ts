import ConstrutorAcomodacao from "../construtores/construtorAcomodacao";
import { NomeAcomadacao } from "../enumeracoes/NomeAcomadacao";
import Diretor from "../abstracoes/diretor";
import Acomodacao from "../modelos/acomodacao";

export default class DiretorFamiliaMais extends Diretor<Acomodacao> {
    constructor() {
        super()
        this.construtor = new ConstrutorAcomodacao()
    }
    public construir(): Acomodacao {
        let obj = this.construtor as ConstrutorAcomodacao
        obj.NomeAcomodacao = NomeAcomadacao.FamiliaMais
        obj.CamaSolteiro = 5
        obj.CamaCasal = 1
        obj.Suite = 2
        obj.Climatizacao = true
        obj.Garagem = 2
        return obj.construir()
    }
}