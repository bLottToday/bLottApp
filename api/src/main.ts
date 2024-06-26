import { NestFactory } from '@nestjs/core';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { AppModule } from './app.module';
/* import { Transport, MicroserviceOptions } from '@nestjs/microservices';
 */
declare const module: any;

async function bootstrap() {
  const app = await NestFactory.create(AppModule, { cors: true });

  //setup api explorer: http://localhost:3000/api
  const config = new DocumentBuilder()
    .setTitle('nestjs backend rest API')
    .setDescription('The rest API description')
    .setVersion('1.0')
    .addTag('restMongo')
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);
  /* 
  const microserviceRedis = app.connectMicroservice<MicroserviceOptions>({
    transport: Transport.REDIS,
    options: {
      host: 'localhost',
      port: 6379,
    },
  });

  await app.startAllMicroservices();
 */
  await app.listen(3000);

  //setup hot reload
  if (module.hot) {
    module.hot.accept();
    module.hot.dispose(() => app.close());
  }
  console.log('api explorer: http://localhost:3000/api');
}
bootstrap();
