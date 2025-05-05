import { Pauta } from "./pauta.entity";

export class CriarPautaDTO {
    descricao: string;
}

export class dadosAoSalvarPauta {
    id: string;
    descricao: string;
    status: string;
}

export function toRepresentation(pauta: Pauta){
    const retornoDTO = new dadosAoSalvarPauta()

    retornoDTO.descricao = pauta.descricao
    retornoDTO.id = pauta.id
    retornoDTO.status = pauta.obterStatus()

    return retornoDTO
}