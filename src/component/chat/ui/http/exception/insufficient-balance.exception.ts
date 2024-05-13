import { HttpException, HttpStatus } from "@nestjs/common";

export class InsufficientBalanceException extends HttpException {
    constructor() {
        super(
          {
            status: HttpStatus.INTERNAL_SERVER_ERROR,
            error: 'InsufficientBalance',
          },
          HttpStatus.INTERNAL_SERVER_ERROR,
        );
      }
}
