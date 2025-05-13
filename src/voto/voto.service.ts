import { Inject, Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { OpcaoVoto, Voto } from './voto.entity';
import { Pauta } from 'src/pautas/pauta.entity';
import { AssociadoService } from './associado/associado.service';
import { Associado } from './associado/associado.entity';

@Injectable()
export class VotoService {
    constructor(
        @Inject('VOTO_REPOSITORY')
        private readonly votoRepository: Repository<Voto>,
        private readonly associadoService: AssociadoService
    ){}


    async registrarVoto(
        cpf: string,
        pauta: Pauta,
        opcaoVoto: OpcaoVoto
    ): Promise<string> {

        if(!pauta.isPautaIniciada){
            return "Pauta ainda não iniciada"
        }

        const associado: Associado | null = await this.associadoService.obterAssociado(cpf)

        if(associado == null){
            return "associado nao encontrado"
        }

        const votoJaRegistrado: boolean = await this.existeVotoPara(pauta, associado);

        if(votoJaRegistrado){
            return "voto já registrado"
        }

        const voto: Voto = new Voto()

        voto.associado = associado
        voto.pauta = pauta
        voto.opcaoVoto = opcaoVoto


        await this.votoRepository.save(voto)
        return("voto registrado")
    }
    async existeVotoPara(pauta: Pauta, associado: Associado): Promise<boolean>{
        const voto: Voto | null = await this.votoRepository.findOne({
            where: {
                pauta: {
                    id: pauta.id
                },
                associado: {
                   id: associado.id 
                }
            }
        })

        return !!voto
    }
}
