import { Module } from '@nestjs/common';
import { VotoService } from './voto.service';
import { VotoController } from './voto.controller';
import { DatabaseModule } from 'src/database/database.module';
import { PautaModule } from 'src/pautas/pauta.module';
import { providers } from './voto.provider';
import { AssociadoService } from './associado/associado.service';
import { AssociadoModule } from './associado/associado.module';

@Module({
  providers: [VotoService, ...providers, AssociadoService],
  controllers: [VotoController],
  imports: [DatabaseModule, PautaModule, AssociadoModule]
})
export class VotoModule {}
