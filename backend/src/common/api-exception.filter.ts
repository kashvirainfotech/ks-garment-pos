import {
  Catch,
  HttpException,
  HttpStatus,
  type ArgumentsHost,
  type ExceptionFilter,
} from "@nestjs/common";
import type { FastifyReply, FastifyRequest } from "fastify";

@Catch()
export class ApiExceptionFilter implements ExceptionFilter {
  catch(exception: unknown, host: ArgumentsHost): void {
    const response = host.switchToHttp().getResponse<FastifyReply>();
    const request = host.switchToHttp().getRequest<FastifyRequest>();
    const status =
      exception instanceof HttpException
        ? exception.getStatus()
        : HttpStatus.INTERNAL_SERVER_ERROR;
    const body =
      exception instanceof HttpException ? exception.getResponse() : undefined;
    const message =
      typeof body === "object" && body !== null && "message" in body
        ? body.message
        : "Request could not be completed.";
    void response.status(status).send({
      error: {
        code:
          status === 404
            ? "NOT_FOUND"
            : status === 500
              ? "INTERNAL_ERROR"
              : "REQUEST_REJECTED",
        message: status >= 500 ? "An unexpected error occurred." : message,
      },
      meta: { requestId: request.id },
    });
  }
}
