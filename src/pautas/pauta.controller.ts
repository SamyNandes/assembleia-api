import { Body, Controller, Get, HttpCode, Param, Post, Req, Res } from '@nestjs/common';
import { REQUEST } from '@nestjs/core';
import { Request, Response } from 'express';
import { PautaService } from './pauta.service';
import { Pauta } from './pauta.entity';
import { HttpStatusCode } from 'axios';
import { CriarPautaDTO, toRepresentation } from './pauta.DTO.resources';
import { Result } from 'src/common/result';
import { ApiBody, ApiOperation } from '@nestjs/swagger';

@Controller('pauta')
export class PautaController {
    constructor(
        private readonly pautaService: PautaService
    ){}
    @Post()
    @ApiOperation({ description: 'Criar uma Pauta' })
    @ApiBody({ type: CriarPautaDTO })
    async salvarPauta(@Body() requisicao, @Res() resposta: Response){
        const conteudo = requisicao
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
    @Post(':id/sessao')
    async IniciarSessao(@Param('id') id: string, @Res() resposta: Response, @Req() requisicao: Request){
        const tempo = requisicao.body.tempo
        const conteudo = await this.pautaService.inicarSessao(id, tempo)
        if(!conteudo){
            resposta.status(HttpStatusCode.NotFound).send(Result.erro('Pauta não encontrada'))
        }
        resposta.status(200).send(conteudo)
    }
}
