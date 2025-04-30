import { Body, Controller, Delete, Get, Param, Post, Res } from '@nestjs/common';
import { Person } from './person/person';
import { PeopleService } from './people.service';
import { Response } from 'express';

@Controller('people')
export class PeopleController {
    
    constructor(
        private peolpeService: PeopleService 
    ){}
    
    @Get()
    Listagem(@Res() res: Response){
        return res.status(200).send(this.peolpeService.listagemDePessoas())
    }
    @Get("/:id")
    ListagemEspecifica(@Param('id') id: number, @Res() res: Response){
        return res.status(200).send(this.peolpeService.ListagemEspecificaPorId(id))
    }
    @Post()
    CriarPessoa(@Body() personToCreate: Person, @Res() res: Response){
        return res.status(201).send(this.peolpeService.CriarPessoa(personToCreate))
    }
    @Delete()
    DeletarPessoa(@Body() personToCreate: Person, @Res() res: Response){
        return res.status(201).send(this.peolpeService.deletarPessoa(personToCreate.id!))
    }
}
