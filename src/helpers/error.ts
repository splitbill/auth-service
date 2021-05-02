export class HttpException extends Error {
    public status: number;
    public message: any;

    constructor(error: any, status: number) {
        super(error.message);
        this.message = error;
        this.status = status;
    }
}