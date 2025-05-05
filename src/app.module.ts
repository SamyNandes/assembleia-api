import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { Hello } from './hello.controller';
import { HelloService } from './hello.service';
import { PeopleModule } from './people/people.module';
import { DatabaseModule } from './database/database.module';
import { PautaModule } from './pautas/pauta.module';

@Module({
  imports: [PeopleModule, DatabaseModule, PautaModule],
  controllers: [AppController, Hello],
  providers: [AppService, HelloService],
})
export class AppModule {}
