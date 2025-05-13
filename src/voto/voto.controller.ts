import { Controller, Param, Req, Post, Res } from '@nestjs/common';
import { HttpStatusCode } from 'axios';
import { Request, Response } from 'express';
import { PautaService } from 'src/pautas/pauta.service';
import { VotoService } from './voto.service';
@Controller('pauta/:id/voto')
export class VotoController {
    constructor(
        private readonly PautaService: PautaService,
        private readonly VotoService: VotoService
    ){}
    @Post()
    async EnviarVoto(
        @Param('id') id: string,
        @Req() requisicao: Request,
        @Res() resposta: Response 
    ){
        return resposta.status(HttpStatusCode.Accepted).send(id)
        
    }

}
