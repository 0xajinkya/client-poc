import http from "http";

type ContainerStatus = 'created' | 'restarting' | 'running' | 'removing' | 'paused' | 'exited' | 'dead';
type ContainerHealth = 'healthy' | 'unhealthy' | 'starting' | 'none';
type ContainerIsolation = 'default' | 'process' | 'hyperv';
type DockerFilters = {
    ancestor?: string[];
    before?: string[];
    expose?: string[];
    exited?: number[];
    health?: ContainerHealth[];
    id?: string[];
    isolation?: ContainerIsolation[];
    // "is-task"?: "true" | "false"; //TODO
    label?: string[];
    name?: string[];
    network?: string[];
    publish?: string[];
    since?: string[];
    status?: ContainerStatus[];
    volume?: string[];
};

type ListContainers = {
    all?: boolean,
    limit?: number,
    size?: boolean,
    filters?: DockerFilters
}

class DockerClient {

    private socketPath: string;
    private path: string

    constructor(socketPath?: string, path?: string) {
        this.socketPath = socketPath ?? '/var/run/docker.sock';
        this.path = path ?? '/v1.47';
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
            socketPath: this.socketPath,
            path: this.path + '/containers/json?' + queryParams.toString(),
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            }
        };
        return new Promise((resolve, reject) => {
            const req = http.request(opts, (res) => {
                let data = '';

                res.on('data', (chunk) => {
                    data += chunk;
                });

                res.on('end', () => {
                    try {
                        const parsedData = JSON.parse(data);
                        resolve(parsedData);
                    } catch (e) {
                        console.warn('Invalid response type, still returning for debug purposes!');
                        resolve(data);
                    }
                });
            });

            req.on('error', (e) => {
                reject(e);
            });
            req.end();
        });
    }
};

export default DockerClient;