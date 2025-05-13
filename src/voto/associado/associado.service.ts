import { Inject, Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { Associado } from './associado.entity';

@Injectable()
export class AssociadoService {
    constructor(
        @Inject('ASSOCIADO_REPOSITORY')
        private readonly associadoRepository: Repository<Associado>
    ){}
    async obterAssociado(paramCPF: string){
        return await this.associadoRepository.findOne({
            where: {
                cpf: paramCPF
            }
        })
    }
    async recuperarOuCadastrar(paramCPF: string){
        const associadoEncontrado = await this.obterAssociado(paramCPF)
        if(associadoEncontrado){
            return associadoEncontrado
        }

        const NovoAssociado = new Associado()
        NovoAssociado.cpf = paramCPF

        return await this.associadoRepository.save(NovoAssociado)
    }
}
