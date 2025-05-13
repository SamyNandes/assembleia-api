import { Module } from '@nestjs/common';
import { providers } from '../voto.provider';
import { DatabaseModule } from 'src/database/database.module';
import { AssociadoController } from './associado.controller';
import { AssociadoService } from './associado.service';

@Module({
    providers: [...providers, AssociadoService],
    imports: [DatabaseModule],
    controllers: [AssociadoController]  
})
export class AssociadoModule {}
