import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  
  const config = new DocumentBuilder()
    .setTitle('Api de Assembleia')
    .setDescription('A API de Assembleia permite a gestão de pautas, associados e votação dentro de uma assembleia. Ela possibilita o registro de associados, o acompanhamento das pautas da reunião, o início de sessões de votação e o gerenciamento dos votos dos participantes. Essa API é útil em ambientes onde decisões precisam ser tomadas por meio de votação formal e controlada.')
    .setVersion('1.0')
    .build();
  const documentFactory = () => SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, documentFactory);

  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
