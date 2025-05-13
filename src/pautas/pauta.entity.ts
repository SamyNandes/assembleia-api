import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn } from "typeorm"

@Entity('pautas')
export class Pauta {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column()
    descricao: string;

    @CreateDateColumn({ name: "data_cadastro" })
    dataCadastro: Date;

    @Column({ type: 'timestamp', nullable: true })
    abertura: Date;

    @Column({ type: 'timestamp', nullable: true })
    fechamento: Date;


    obterStatus(): string{
        if(this.fechamento && this.fechamento < new Date()){
            return TIPO_STATUS.FINALIZADA
        }
        if(this.abertura){
            return TIPO_STATUS.INCIADA
        }
        
        return TIPO_STATUS.NAO_INICIADA
    }

    public isPautaIniciada(){
        return this.isInStatus(TIPO_STATUS.INCIADA)
    }
    public isPautaFinalizada(){
        return this.isInStatus(TIPO_STATUS.FINALIZADA)
    }
    public isPautaNaoIniciada(){
        return this.isInStatus(TIPO_STATUS.NAO_INICIADA)
    }
    public isInStatus(PautaAVerificar: TIPO_STATUS){
        const status = this.obterStatus();
        return status == PautaAVerificar;
    }


}

enum TIPO_STATUS {
    NAO_INICIADA = "Pauta ainda não inciada",
    INCIADA = "Pauta iniciada",
    FINALIZADA = "Pauta encerrada"
}