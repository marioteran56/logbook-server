import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MongooseModule } from '@nestjs/mongoose';
import { UsersModule } from './modules/users/users.module';
import { StudentsModule } from './modules/students/students.module';
import { ProfessorsModule } from './modules/professors/professors.module';
import { EntriesModule } from './modules/entries/entries.module';
import { CoursesModule } from './modules/courses/courses.module';
import { AuthModule } from './modules/auth/auth.module';
import { ConfigModule } from '@nestjs/config';
import { ssRegisterModule } from './modules/ssregister/ss.module';

@Module({
  imports: [
    ConfigModule.forRoot( {isGlobal: true} ),
    MongooseModule.forRoot(process.env.DATABASE_URL, { dbName: 'logbook' }),
    UsersModule,
    StudentsModule,
    ProfessorsModule,
    EntriesModule,
    CoursesModule,
    AuthModule,
    ssRegisterModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
