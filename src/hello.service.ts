import { Injectable } from "@nestjs/common";

@Injectable()
export class HelloService{
    HelloYou(): string{
        return "hello, you"
    }
}