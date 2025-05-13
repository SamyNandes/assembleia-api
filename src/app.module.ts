import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { DatabaseModule } from './database/database.module';
import { PautaModule } from './pautas/pauta.module';
import { VotoModule } from './voto/voto.module';
import { AssociadoService } from './voto/associado/associado.service';
import { providers } from './voto/voto.provider';

@Module({
  imports: [DatabaseModule, PautaModule, VotoModule],
  controllers: [AppController],
  providers: [AppService, AssociadoService, ...providers],
})
export class AppModule {}
