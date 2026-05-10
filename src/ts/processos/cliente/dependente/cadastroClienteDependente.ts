import Processo from "../../../abstracoes/processo";
import Armazem from "../../../dominio/armazem";
import Cliente from "../../../modelos/cliente";
import CadastrarDocumentosCliente from "../../documentos/cadastrarDocumentosCliente";
import CadastroEnderecoDependente from "../../enderecos/dependente/cadastroEnderecoDependente";

export default class CadastroClienteDependente extends Processo {
    processar(): void {
        console.log('Iniciando o cadastro de um novo dependente...')
        let nome = this.entrada.receberTexto('Qual o nome do novo dependente?')
        let nomeSocial = this.entrada.receberTexto('Qual o nome social do novo dependente?')
        let dataNascimento = this.entrada.receberData('Qual a data de nascimento?')
        let cliente = new Cliente(nome, nomeSocial, dataNascimento)

        this.processo = new CadastroEnderecoDependente(cliente)
        this.processo.processar()

        this.processo = new CadastrarDocumentosCliente(cliente)
        this.processo.processar()

        let armazem = Armazem.InstanciaUnica
        armazem.Clientes.push(cliente)

        console.log('Finalizando o cadastro do dependente...')
    }
}   
