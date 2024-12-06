// Code generated by protoc-gen-ts_proto. DO NOT EDIT.
// versions:
//   protoc-gen-ts_proto  v2.5.0
//   protoc               v3.20.3
// source: proto/sessions.proto

/* eslint-disable */
import { GrpcMethod, GrpcStreamMethod } from "@nestjs/microservices";
import { Observable } from "rxjs";

export const protobufPackage = "sessions";

export interface Empty {
}

export interface GetSessionsListResponse {
  sessions: Session[];
}

export interface Session {
  id: number;
  hallId: number;
  filmId: number;
  startTime: number;
  bookedSeats: string[];
}

export const SESSIONS_PACKAGE_NAME = "sessions";

export interface SessionsServiceClient {
  getSessionsList(request: Empty): Observable<GetSessionsListResponse>;
}

export interface SessionsServiceController {
  getSessionsList(
    request: Empty,
  ): Promise<GetSessionsListResponse> | Observable<GetSessionsListResponse> | GetSessionsListResponse;
}

export function SessionsServiceControllerMethods() {
  return function (constructor: Function) {
    const grpcMethods: string[] = ["getSessionsList"];
    for (const method of grpcMethods) {
      const descriptor: any = Reflect.getOwnPropertyDescriptor(constructor.prototype, method);
      GrpcMethod("SessionsService", method)(constructor.prototype[method], method, descriptor);
    }
    const grpcStreamMethods: string[] = [];
    for (const method of grpcStreamMethods) {
      const descriptor: any = Reflect.getOwnPropertyDescriptor(constructor.prototype, method);
      GrpcStreamMethod("SessionsService", method)(constructor.prototype[method], method, descriptor);
    }
  };
}

export const SESSIONS_SERVICE_NAME = "SessionsService";