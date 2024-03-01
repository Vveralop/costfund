import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: '192.168.100.63',
      port: 5432,
      username: 'postgres', //process.env.ACCESSKEYID,
      password: 'Test01', //process.env.SECRETACCESSKEY,
      database: 'postgres',
      entities: [__dirname + '/../**/*.entity{.ts, .js}'],
      synchronize: true,
      autoLoadEntities: true,
    }),
  ],
  controllers: [],
  providers: [],
})
export class Database {}
