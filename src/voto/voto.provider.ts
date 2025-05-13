import { DataSource, Repository  } from "typeorm"
import { Voto } from './voto.entity'
import { Provider } from "@nestjs/common"
import { Associado } from "./associado/associado.entity"

const votoProvider: Provider<Repository<Voto>> = {
    provide: "VOTO_REPOSITORY",
    useFactory: async (dataSource: DataSource) => {
        const votoRepository: Repository<Voto> = await dataSource.getRepository(Voto)
        return votoRepository
    },
    inject: ['DATA_SOURCE_MYSQL']
}

const associadoProvider: Provider<Repository<Associado>> = {
    provide: "ASSOCIADO_REPOSITORY",
    useFactory: async (dataSource: DataSource) => {
        const associadoRepository: Repository<Associado> = await dataSource.getRepository(Associado)
        return associadoRepository
    },
    inject: ['DATA_SOURCE_MYSQL']
}



export const providers: Provider[] = [votoProvider, associadoProvider]

