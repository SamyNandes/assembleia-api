import { Provider } from "@nestjs/common";
import { DataSource, Repository } from "typeorm"; 
import { Pauta } from "./pauta.entity";


const PautaProviders: Provider<Repository<Pauta>> = 
    {
        provide: 'PAUTA_PROVIDER',
        useFactory: async (dataSource: DataSource) => {
            const repository: Repository<Pauta> = dataSource.getRepository(Pauta);
            return repository;
        },
        inject: ['DATA_SOURCE_MYSQL']
}

export const PautaProvider: Provider[] = [PautaProviders]
