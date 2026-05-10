import ConstrutorAcomodacao from "../construtores/construtorAcomodacao";
import { NomeAcomadacao } from "../enumeracoes/NomeAcomadacao";
import Diretor from "../abstracoes/diretor";
import Acomodacao from "../modelos/acomodacao";

export default class DiretorFamiliaSuper extends Diretor<Acomodacao> {
    constructor() {
        super()
        this.construtor = new ConstrutorAcomodacao()
    }
    public construir(): Acomodacao {
        let obj = this.construtor as ConstrutorAcomodacao
        obj.NomeAcomodacao = NomeAcomadacao.FamiliaSuper
        obj.CamaSolteiro = 6
        obj.CamaCasal = 2
        obj.Suite = 3
        obj.Climatizacao = true
        obj.Garagem = 2
        return obj.construir()
    }
}