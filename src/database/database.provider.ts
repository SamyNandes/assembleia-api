import { Provider } from "@nestjs/common";
import { Pauta } from "src/pautas/pauta.entity";
import { DataSource } from "typeorm";

export const databaseProviders: Provider[] = [
    {
        provide: 'DATA_SOURCE_MYSQL',
        useFactory: async () => {
            const dataSource = new DataSource({
                type: 'mysql',
                host: 'localhost',
                port: 3306,
                username: 'root',
                password: 'root',
                database: 'assembleia',
                entities: [
                    __dirname + '/../**/*.entity{.ts,.js}'
                ],
                synchronize: true
            });
            
            return dataSource.initialize();
        }
    }
]