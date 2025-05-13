import { Controller, Param, Req, Post, Res } from '@nestjs/common';
import { HttpStatusCode } from 'axios';
import { Request, Response } from 'express';
import { PautaService } from 'src/pautas/pauta.service';
import { VotoService } from './voto.service';
import { OpcaoVoto } from './voto.entity';
import { AssociadoService } from './associado/associado.service';
import { Associado } from './associado/associado.entity';

@Controller('pauta/:id/voto')
export class VotoController {
    constructor(
        private readonly PautaService: PautaService,
        private readonly VotoService: VotoService,
        private readonly AssociadoService: AssociadoService
    ){}
    @Post()
    async EnviarVoto(
        @Param('id') id: string,
        @Req() requisicao: Request,
        @Res() resposta: Response 
    ){
        const pauta = await this.PautaService.retornarPauta(id)
        if(pauta == null){
            return resposta.status(404).send('Pauta não encontrada')
        }
        if(pauta.isPautaNaoIniciada()){
            return resposta.status(422).send('Pauta não iniciada')
        }
        const conteudo = requisicao.body
        const cpf = conteudo.cpf
        
        const associado: Associado | null = await this.AssociadoService.obterAssociado(cpf)
        
        if (!associado) {
            return resposta.status(404).send('Associado nao encontrado')
        }

        const opcao: OpcaoVoto = conteudo.opcao

       const ExisteVotoBoolean = await this.VotoService.existeVotoPara(pauta, associado)


        if(ExisteVotoBoolean){
            return resposta.status(409).send('voto já registrado por associado e na pauta')
        }
        const respostaDoRegistrar = await this.VotoService.registrarVoto(cpf, pauta, opcao)

        return resposta.status(HttpStatusCode.Accepted).send(respostaDoRegistrar)
    }

}
