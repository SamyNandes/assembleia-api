import { Controller, Get } from '@nestjs/common'
import { HelloService } from './hello.service'


@Controller()
export class Hello {

    constructor(
        private readonly service: HelloService
    ){}

    @Get("/Hello")
    HelloYou(): string {
        return this.service.HelloYou()
    }

}