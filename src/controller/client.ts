import { ContainerClient } from "./container";

export class DockerClient {

    private _socketPath: string;
    private _path: string
    public containers: ContainerClient;

    constructor(socketPath?: string, path?: string) {
        this._socketPath = socketPath ?? '/var/run/docker.sock';
        this._path = path ?? '/v1.47';

        this.containers = new ContainerClient(this);
    }

    get socketPath() {
        return this._socketPath;
    }

    get path() {
        return this._path
    }
};