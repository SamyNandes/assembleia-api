import { Module } from '@nestjs/common';
import { DatabaseModule } from 'src/database/database.module';
import { PautaProvider } from './pauta.provider';
import { PautaService } from './pauta.service';
import { PautaController } from './pauta.controller';
import { databaseProviders } from 'src/database/database.provider';

@Module({
    imports: [DatabaseModule],
    providers: [...PautaProvider, PautaService],
    controllers: [PautaController]
})
export class PautaModule {}
