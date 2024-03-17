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
import { FacultyModule } from './modules/faculties/faculties.module';
import { asRegisterModule } from './modules/assistanships/as.module';
import { TypeormService } from './inventory/services/typeorm/typeorm.service';
import { ItemsService } from './inventory/services/items/items.service';
import { ItemController } from './inventory/controller/item/item.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Items } from './inventory/models/item.model';

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
    ssRegisterModule,
    FacultyModule,
    asRegisterModule,
    TypeOrmModule.forRootAsync({useClass: TypeormService}),
    TypeOrmModule.forFeature([Items])
  ],
  controllers: [AppController, ItemController],
  providers: [AppService, TypeormService, ItemsService],
})
export class AppModule {}
