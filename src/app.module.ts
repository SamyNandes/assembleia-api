import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { Hello } from './hello.controller';
import { HelloService } from './hello.service';
import { PeopleModule } from './people/people.module';
import { DatabaseModule } from './database/database.module';
import { PautaModule } from './pautas/pauta.module';
import { VotoModule } from './voto/voto.module';
import { AssociadoService } from './voto/associado/associado.service';
import { providers } from './voto/voto.provider';

@Module({
  imports: [PeopleModule, DatabaseModule, PautaModule, VotoModule],
  controllers: [AppController, Hello],
  providers: [AppService, HelloService, AssociadoService, ...providers],
})
export class AppModule {}
