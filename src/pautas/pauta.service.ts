import { Inject, Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { Pauta } from './pauta.entity';
import { CriarPautaDTO, toRepresentation } from './pauta.DTO.resources';
import { Result } from 'src/common/result';

@Injectable()
export class PautaService {

    constructor(
        @Inject('PAUTA_PROVIDER')
        private readonly PautaRepository: Repository<Pauta>
    ){}

    async salvar(pauta: Pauta): Promise<Pauta | string | Result| any> {
        const possivelPauta = await this.PautaRepository.findOne({
            where: {
                descricao: pauta.descricao
            }
        })
        if(possivelPauta){
            const erro = Result.erro("Pauta já criada!")
            return erro 
        }
        // salva a pauta
        const pautaSalva = await this.PautaRepository.save(pauta);

        // re-hidrata com os métodos da classe
        const pautaComMetodo = Object.assign(new Pauta(), pautaSalva);

        // gera o DTO de resposta
        const dto = toRepresentation(pautaComMetodo);

        return dto
    }

    async retornarPautas(): Promise<Pauta[]>{
        return await this.PautaRepository.find()
    }
}
