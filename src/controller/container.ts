import type { DockerClient } from "./client";
import type { ListContainersContainer, ListContainers, CreateContainerInput } from "../types";
import { ContainerService } from "../services";

export class ContainerClient {
    private dockerClient: DockerClient;

    constructor(dockerClient: DockerClient) {
        if(!dockerClient) throw new Error('DockerClient is required!');
        this.dockerClient = dockerClient;
    }

    public async listContainers({
        all = false,
        limit,
        size,
        filters
    }: ListContainers = {}) {
        const queryParams = new URLSearchParams();

        if (all) queryParams.append('all', 'true');
        if (limit !== undefined) queryParams.append('limit', limit.toString());
        if (size) queryParams.append('size', 'true');

        if (filters) {
            queryParams.append('filters', JSON.stringify(filters));
        }

        const opts = {
            socketPath: this.dockerClient.socketPath,
            path: this.dockerClient.path + '/containers/json?' + queryParams.toString(),
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            }
        };
        return (await ContainerService.listContainers<ListContainersContainer[]>(opts))
    };
}