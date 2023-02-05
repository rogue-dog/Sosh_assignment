import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';

import { MongooseModule } from '@nestjs/mongoose';
import { UserModule } from './users/users.module';
import { BlogsModule } from './blogs/blogs.module';

@Module({
  imports: [
    MongooseModule.forRoot(
      'mongodb+srv://rogue-dog:pJetJOUKgKvDfrsM@samaajik.rp1nbju.mongodb.net/?retryWrites=true&w=majority',
    ),
    UserModule,
    BlogsModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
