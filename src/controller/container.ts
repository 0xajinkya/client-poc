import type { DockerClient } from "./client";
import type { ListContainersContainer, ListContainers, CreateContainerInput, CreateContainerResponse, InspectContainerInput, InspectContainerResponse, ListContainerProcessesBody, ListContainerProcessesResponse, GetContainerLogsRequest, GetChangesRequest, GetChangesResponse, ExportContainerRequest, GetContainerStatsRequestBody, ExportContainerResponse } from "../types";
import { ContainerService } from "../services";
import { type RequestOptions } from "http"
export class ContainerClient {
    private dockerClient: DockerClient;

    constructor(dockerClient: DockerClient) {
        if (!dockerClient) throw new Error('DockerClient is required!');
        this.dockerClient = dockerClient;
    }

    public async listContainers({
        all = false,
        limit,
        size,
        filters
    }: ListContainers = {}): Promise<ListContainersContainer[]> {
        const queryParams = new URLSearchParams();

        if (all) queryParams.append('all', 'true');
        if (limit !== undefined) queryParams.append('limit', limit.toString());
        if (size) queryParams.append('size', 'true');

        if (filters) {
            queryParams.append('filters', JSON.stringify(filters));
        }

        const opts: RequestOptions = {
            socketPath: this.dockerClient.socketPath,
            path: this.dockerClient.path + '/containers/json?' + queryParams.toString(),
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            }
        };
        return JSON.parse(await ContainerService.listContainers<string>(opts))
    };

    public async createContainer(input: CreateContainerInput): Promise<CreateContainerResponse> {
        const {
            name, platform, ...body
        } = input;

        const queryParams = new URLSearchParams();
        queryParams.append('name', name);
        if (platform) queryParams.append('platform', platform);

        const opts: RequestOptions = {
            socketPath: this.dockerClient.socketPath,
            path: this.dockerClient.path + '/containers/create?' + queryParams.toString(),
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
        }
        return JSON.parse(await ContainerService.createContainer<string>(opts, body))
    }

    public async inspectContainer(input: InspectContainerInput): Promise<InspectContainerResponse> {
        const {
            id, size
        } = input;
        const queryParams = new URLSearchParams();
        if (size) queryParams.append('size', JSON.stringify(size));

        const opts: RequestOptions = {
            socketPath: this.dockerClient.socketPath,
            path: this.dockerClient.path + `/containers/${id}/json?${queryParams.toString()}`,
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            }
        };
        return JSON.parse(await ContainerService.inspectContainer<string>(opts))
    }

    public async listContainerProcesses(input: ListContainerProcessesBody): Promise<ListContainerProcessesResponse> {
        const {
            id,
            ps_args
        } = input;
        const queryParams = new URLSearchParams();
        queryParams.append('ps_args', ps_args ? ps_args : "-ef");

        const opts: RequestOptions = {
            socketPath: this.dockerClient.socketPath,
            path: this.dockerClient.path + `/containers/${id}/top?${queryParams.toString()}`,
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            }
        };
        return JSON.parse(await ContainerService.listContainerProcesses<string>(opts))
    }

    public async getContainerLogs(input: GetContainerLogsRequest) {
        const {
            id,
            ...query
        } = input;
        const {
            follow,
            stdout,
            stderr,
            since,
            until,
            timestamps,
            tail
        } = query;
        if (!stdout && !stderr) {
            throw new Error("You must choose at least one stream (stdout or stderr).");
        }
        const queryParams = new URLSearchParams();
        if (follow) queryParams.append('follow', 'true');
        if (stdout) queryParams.append('stdout', 'true');
        if (stderr) queryParams.append('stderr', 'true');
        if (since) queryParams.append('since', since.toString());
        if (until) queryParams.append('until', until.toString());
        if (timestamps) queryParams.append('timestamps', 'true');
        if (tail) queryParams.append('tail', tail);

        const opts: RequestOptions = {
            socketPath: this.dockerClient.socketPath,
            path: this.dockerClient.path + `/containers/${id}/logs?${queryParams.toString()}`,
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            }
        };
        return (await ContainerService.getContainerLogs<string>(opts))
    }

    public async getChanges(input: GetChangesRequest): Promise<GetChangesResponse> {
        const {
            id,
        } = input;
        const opts: RequestOptions = {
            socketPath: this.dockerClient.socketPath,
            path: this.dockerClient.path + `/containers/${id}/changes`,
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            }
        };
        return JSON.parse(await ContainerService.getChanges<string>(opts))
    };

    public async exportContainer(input: GetContainerStatsRequestBody): Promise<ExportContainerResponse> {
        const {
            id,
            ...query
        } = input;

        const opts: RequestOptions = {
            socketPath: this.dockerClient.socketPath,
            path: this.dockerClient.path + `/containers/${id}/export`,
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            }
        };
        return JSON.parse(await ContainerService.exportContainer<string>(opts))
    }
}