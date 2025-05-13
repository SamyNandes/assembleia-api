import { Module } from '@nestjs/common';
import { providers } from '../voto.provider';
import { DatabaseModule } from 'src/database/database.module';

@Module({
    providers: [...providers],
    imports: [DatabaseModule]  
})
export class AssociadoModule {}
