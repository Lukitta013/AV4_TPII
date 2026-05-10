import Menu from "../interfaces/menu"

export default class MenuHospedagem implements Menu {
    mostrar(): void {
        console.clear()
        console.log(`****************************`)
        console.log(`| Gestão de Hospedagem`)
        console.log(`----------------------`)
        console.log(`| 1 - Registrar hóspede (check-in)`)
        console.log(`| 2 - Listar hóspedes ativos`)
        console.log(`| 3 - Check-out de hóspede`)
        console.log(`| 0 - Voltar`)
        console.log(`----------------------`)
    }
}