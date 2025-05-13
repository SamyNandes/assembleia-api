import { ApiProperty } from '@nestjs/swagger';
import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm'

@Entity()
export class Associado {
    
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column()
    cpf: string;
}