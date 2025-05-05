export class Result {
    constructor(
        private Message: string | undefined,
        private Error: string | undefined
    ){}

    static ok(value: string){
        return new Result(value, undefined)
    }
    static erro(error: string){
        return new Result(undefined, error)
    }

    isError(){
        return this.Error !== undefined
    }
}