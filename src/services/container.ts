// import http from "http";
import type { CreateContainerBody } from "../types";
import { type RequestOptions } from "http";
import { http } from "./http";

export class ContainerService {
    public static listContainers<T>(options: RequestOptions): Promise<T> {
        return http.handleRequest<T>(options);
    }

    public static createContainer<T>(options: RequestOptions, body: CreateContainerBody): Promise<T> {
        return http.handleRequest<T>(options, body);
    }

    public static inspectContainer<T>(options: RequestOptions): Promise<T> {
        return http.handleRequest<T>(options);
    }

    public static listContainerProcesses<T>(options: RequestOptions): Promise<T> {
        return http.handleRequest<T>(options);
    }

    public static getContainerLogs<T>(options: RequestOptions): Promise<T> {
        return http.handleRequest<T>(options);
    }

    public static getChanges<T>(options: RequestOptions): Promise<T> {
        return http.handleRequest<T>(options);
    }

    public static exportContainer<T>(options: RequestOptions): Promise<T> {
        return http.handleRequest<T>(options);
    }
}