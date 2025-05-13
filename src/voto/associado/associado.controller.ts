import { Controller, Post, Req, Res } from '@nestjs/common';
import { Request, Response, response } from 'express';
import { AssociadoService } from './associado.service';

@Controller('associado')
export class AssociadoController {
    constructor(
        private AssociadoService: AssociadoService
    ){}
    @Post()
    async criarAssociado(
        @Req() requisicao: Request,
        @Res() resposta: Response
    ){
        const associadoCPF = requisicao.body.cpf
        
        this.AssociadoService.recuperarOuCadastrar(associadoCPF)
        return resposta.status(201).send("associado criado")
        
    }
}
