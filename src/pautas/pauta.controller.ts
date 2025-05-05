import { Controller, Get, HttpCode, Post, Req, Res } from '@nestjs/common';
import { REQUEST } from '@nestjs/core';
import { Request, Response } from 'express';
import { PautaService } from './pauta.service';
import { Pauta } from './pauta.entity';
import { HttpStatusCode } from 'axios';
import { toRepresentation } from './pauta.DTO.resources';

@Controller('pauta')
export class PautaController {
    constructor(
        private readonly pautaService: PautaService
    ){}
    @Post()
    async salvarPauta(@Req() requisicao: Request, @Res() resposta: Response){
        const conteudo = requisicao.body
        const respostaDoSalvamento = await this.pautaService.salvar(conteudo)
        if(typeof respostaDoSalvamento == 'string'){
            return resposta.status(409).send(respostaDoSalvamento);
        }
        return resposta.status(201).send(respostaDoSalvamento);
    }

    @Get()
    async retornarPautas(@Res() resposta: Response){
        const pautas: Pauta[] = await this.pautaService.retornarPautas()
        return resposta.status(HttpStatusCode.Found).send(pautas.map(toRepresentation))
    }
}
