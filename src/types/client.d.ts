export type ContainerStatus = 'created' | 'restarting' | 'running' | 'removing' | 'paused' | 'exited' | 'dead';
export type ContainerHealth = 'healthy' | 'unhealthy' | 'starting' | 'none';
export type ContainerIsolation = 'default' | 'process' | 'hyperv';
export type DockerFilters = {
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