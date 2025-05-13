import { Inject, Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { Pauta } from './pauta.entity';
import { CriarPautaDTO, toRepresentation } from './pauta.DTO.resources';
import { Result } from 'src/common/result';

@Injectable()
export class PautaService {

    static TEMPO_PADRAO_MINUTOS = 10 

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

    async inicarSessao(id: string, tempo: number = PautaService.TEMPO_PADRAO_MINUTOS ){
        const pauta = await this.PautaRepository.findOne({
            where: {
                id: id 
            }
        })

        if(!pauta){
            return false
        }

        const tempoAbertura = new Date();
        pauta!.abertura = tempoAbertura
        const aberturaEmMilisegundos = tempoAbertura.getTime()
        pauta!.fechamento = new Date(aberturaEmMilisegundos + tempo * 60000);

        return await this.PautaRepository.save(pauta!)
    }

    async retornarPautas(): Promise<Pauta[]>{
        return await this.PautaRepository.find()
    }
    async retornarPauta(idParam: string): Promise<Pauta | null > {
        const pautaEncontrada = await this.PautaRepository.findOne({
            where: {
                id: idParam
            }
        })
        return pautaEncontrada
    }
}
