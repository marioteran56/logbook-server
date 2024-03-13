import { Injectable } from '@nestjs/common';
import { TypeOrmModuleOptions, TypeOrmOptionsFactory } from '@nestjs/typeorm';

@Injectable()
export class TypeormService implements TypeOrmOptionsFactory {
    createTypeOrmOptions(): TypeOrmModuleOptions | Promise<TypeOrmModuleOptions> {
       
        return {
            type: 'mssql',
            username: 'sa',
            password: 'Inventari0',
            port: 1433,
            database: 'Inventario',

            entities: ['dist/**/*.model.{ts,js}']
        }
    }
}
