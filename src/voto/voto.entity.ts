import { Pauta } from "src/pautas/pauta.entity";
import { Entity, Column, PrimaryGeneratedColumn, ManyToOne, JoinColumn } from "typeorm";
import { Associado } from "./associado/associado.entity";

@Entity('voto')
export class Voto{
    
    @PrimaryGeneratedColumn('uuid')
    id: string

    @Column()
    teste: string
    
    @ManyToOne( ()=> Associado)
    @JoinColumn({ name: 'id_associado' })
    associado: Associado

    @ManyToOne( ()=> Pauta)
    @JoinColumn({ name: 'id_pauta' })
    pauta: Pauta

    @Column()
    opcaoVoto: OpcaoVoto
}

export enum OpcaoVoto{
    SIM = "SIM",
    NAO = "NAO"
}
