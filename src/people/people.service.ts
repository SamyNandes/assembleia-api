import { Injectable } from '@nestjs/common';
import { Person } from './person/person';

@Injectable()
export class PeopleService {

    person: Person[] = [{ id: 2, name: "Samyra "}, { id: 1, name: "Fernandes"}, { id: 3, name: "Fernandes"}]

    listagemDePessoas(): Person[]{
        return this.person
    }
    ListagemEspecificaPorId(id: number){
        const people = this.listagemDePessoas()
        const peopleFilter = people.filter(x => {
            return x.id == id
        } )
        return peopleFilter
    }
    CriarPessoa(personToCreate: Person) {
        return this.person.push(personToCreate)
    }
    deletarPessoa(id: number) {
        return this.person = this.person.filter(x => x.id !== id)
    }
}
