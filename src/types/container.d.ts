export type ContainerStatus = 'created' | 'restarting' | 'running' | 'removing' | 'paused' | 'exited' | 'dead';

export type PortType = "tcp" | "udp" | "sctp";

export type Port = {
    PrivatePort: number;
    PublicPort?: number;
    Type: PortType;
}

export type HostConfig = {
    NetworkMode: string;
    Annotations?: {
        [key: string]: string;
    };
}

export type NetworkSettings = {
    Networks: {
        [key: string]: Network;
    };
}

export type Network = {
    NetworkID: string;
    EndpointID: string;
    Gateway: string;
    IPAddress: string;
    IPPrefixLen: number;
    IPv6Gateway: string;
    GlobalIPv6Address: string;
    GlobalIPv6PrefixLen: number;
    MacAddress: string;
}

export type Mount = {
    Name: string;
    Source: string;
    Destination: string;
    Driver: string;
    Mode: string;
    RW: boolean;
    Propagation: string;
}

export type BlkioDeviceBps = {
    Path: string,
    Rate: number
}

export type ListContainersContainer = {
    Id: string;
    Names: string[];
    Image: string;
    ImageID: string;
    Command: string;
    Created: number;
    State: ContainerStatus;
    Status: string;
    Ports: Port[];
    Labels: {
        [key: string]: string;
    };
    SizeRw: number;
    SizeRootFs: number;
    HostConfig: HostConfig;
    NetworkSettings: NetworkSettings;
    Mounts: Mount[];
};

export type ListContainers = {
    all?: boolean,
    limit?: number,
    size?: boolean,
    filters?: DockerFilters
}

export type ContainerHostConfig = {
    CpuShares?: number,
    Memory?: number,
    CgroupParent?: string,
    BlkioWeight?: number,
    BlkioWeightDevice?: {
        Path: string,
        Weight: number
    }[],
    BlkioDeviceReadBps?: BlkioDeviceBps[],
    BlkioDeviceWriteBps?: BlkioDeviceBps[],
    BlkioDeviceReadIOps?: BlkioDeviceBps[],
    BlkioDeviceWriteIOps?: BlkioDeviceBps[],
    CpuPeriod?: number,
    CpuQuota?: number,
    CpuRealtimePeriod?: number,
    CpuRealtimeRuntime?: number,
    CpusetCpus?: string,
    CpusetMems?: string,
    Devices?: {
        PathOnHost: string,
        PathInContainer: string,
        CgroupPermissions: string
    }[],
    DeviceCgroupRules?: string[],
    DeviceRequests?: {
        Driver: string,
        Count: number,
        DeviceIDs: string[],
        Capabilities: string[],
        Options: {
            [key: string]: string;
        }
    },
    KernelMemoryTCP?: number,
    MemoryReservation?: number,
    MemorySwap?: number,
    MemorySwappiness?: number,
    NanoCPUs?: number,
    OomKillDisable?: boolean,
    Init?: boolean,
    PidsLimit?: number,
    Ulimits?: {
        Name: string,
        Soft: number,
        Hard: number
    }[],
    CpuCount?: number,
    CpuPercent?: number,
    IOMaximumIOps?: number,
    IOMaximumBandwidth?: number,
    Binds?: string[],
    ContainerIDFile?: string,
    LogConfig?: {
        Type: string,
        Config: {
            [key: string]: string;
        }
    },
    NetworkMode?: string,
    PortBindings?: {
        [key: string]: {
            HostIp?: string,
            HostPort?: string
        }[]
    },
    RestartPolicy?: {
        Name: "" | "no" | "always" | "unless-stopped" | "on-failure",
        MaximumRetryCount?: number
    },
    AutoRemove?: boolean,
    VolumeDriver?: string,
    VolumesFrom?: string[],
    Mounts?: {
        Target: string,
        Source: string,
        Type: "bind" | "volume" | "tmpfs" | "npipe" | "cluster",
        ReadOnly: boolean,
        Consistency: string,
        BindOptions: {
            Propagation: "private" | "rprivate" | "shared" | "rshared" | "slave" | "rslave",
            NonRecursive: boolean,
            CreateMountpoint: boolean,
            ReadOnlyNonRecursive: boolean,
            ReadOnlyForceRecursive: boolean,
        },
        VolumeOptions: {
            NoCopy: boolean,
            Labels: {
                [key: string]: string;
            },
            DriverConfig: {
                Name: string,
                Options: {
                    [key: string]: string;
                }
            },
            Subpath: string
        },
        TmpfsOptions: {
            SizeBytes: number,
            Mode: number,
            Options: string[]
        }
    }[],
    ConsoleSize?: number[],
    Annotations?: {
        [key: string]
    },
    CapAdd?: string[],
    CapDrop?: string[],
    CgroupnsMode?: "private" | "host",
    Dns?: string[],
    DnsOptions?: string[],
    DnsSearch?: string[],
    ExtraHosts?: string[],
    GroupAdd?: string[],
    IpcMode?: "none" | "private" | "shareable" | "host" | string,
    Cgroup?: string,
    Links?: string[],
    OomScoreAdj?: number,
    PidMode?: "host" | string,
    Privileged?: boolean,
    PublishAllPorts?: boolean,
    ReadonlyRootfs?: boolean,
    SecurityOpt?: string[],
    StorageOpt?: {
        size?: string,
        [key: string]: string
    },
    Tmpfs?: {
        [key: string]: string
    },
    UTSMode?: string,
    UsernsMode?: string,
    ShmSize: number,
    Sysctls?: {
        [key: string]: string
    },
    Runtime?: string,
    Isolation?: "default" | "process" | "hyperv",
    MaskedPaths?: string[],
    ReadonlyPaths?: string[],
};

export type CreateContainerBody = {
    Hostname?: string,
    Domainname?: string,
    User?: string,
    AttachStdin?: boolean,
    AttachStdout?: boolean,
    AttachStderr?: boolean,
    ExposedPorts?: {
        [key: string]: object;
    },
    Tty?: boolean,
    OpenStdin?: boolean,
    StdinOnce?: boolean,
    Env?: string[],
    Cmd?: string[],
    Healthcheck?: {
        Test: string[],
        Interval: number,
        Timeout: number,
        Retries: number,
        StartPeriod: number
        StartInterval: number
    },
    ArgsEscaped?: boolean,
    Image?: string,
    Volumes?: {
        [key: string]: object;
    },
    WorkingDir?: string,
    Entrypoint?: string[],
    NetworkDisabled?: boolean,
    MacAddress?: string,
    OnBuild?: string[],
    Labels?: {
        [key: string]: string;
    },
    StopSignal?: string,
    StopTimeout?: number,
    Shell?: string[],
    HostConfig?: ContainerHostConfig,
    NetworkingConfig?: {
        EndpointsConfig?: {
            [key: string]: object
        }
    }
};

export type CreateContainerInput = {
    name: string,
    platform?: string,
} & CreateContainerBody;

export type CreateContainerResponse = {
    "Id": string;
    Warnings: string[];
};

export type InspectContainerInput = {
    id: string,
    size?: boolean,
}

export type InspectContainerResponse = {
    AppArmorProfile: string;
    Args: string[];
    Config: {
        AttachStderr: boolean;
        AttachStdin: boolean;
        AttachStdout: boolean;
        Cmd: string[];
        Domainname: string;
        Env: string[];
        Healthcheck: {
            [key as string]: string[]
        };
        Hostname: string;
        Image: string;
        Labels: {
            [key: string]: string;
        };
        MacAddress: string;
        NetworkDisabled: boolean;
        OpenStdin: boolean;
        StdinOnce: boolean;
        Tty: boolean;
        User: string;
        Volumes: {
            [key: string]: object;
        };
        WorkingDir: string;
        StopSignal: string;
        StopTimeout: number;
    };
    Created: string;
    Driver: string;
    ExecIDs: string[];
    HostConfig: ContainerHostConfig,
    HostnamePath: string;
    HostsPath: string;
    LogPath: string;
    Id: string;
    Image: string;
    MountLabel: string;
    Name: string;
    NetworkSettings: {
        Bridge: string;
        SandboxID: string;
        HairpinMode: boolean;
        LinkLocalIPv6Address: string;
        LinkLocalIPv6PrefixLen: number;
        SandboxKey: string;
        EndpointID: string;
        Gateway: string;
        GlobalIPv6Address: string;
        GlobalIPv6PrefixLen: number;
        IPAddress: string;
        IPPrefixLen: number;
        IPv6Gateway: string;
        MacAddress: string;
        Networks: {
            [key: string]: Network;
        };
    },
    Path: string;
    ProcessLabel: string;
    ResolvConfPath: string;
    RestartCount: number;
    State: {
        Error: string;
        ExitCode: number;
        FinishedAt: string;
        Health: {
            Status: string;
            FailingStreak: number;
            Log: {
                Start: string;
                End: string;
                ExitCode: number,
                Output: string
            }[]
        }
        OOMKilled: boolean;
        Dead: boolean;
        Paused: boolean;
        Pid: number;
        Restarting: boolean;
        Running: boolean;
        StartedAt: string;
        Status: string;
    };
    Mounts: Mount[];
}

export type ListContainerProcessesBody = {
    id: string,
    ps_args?: string
};

export type ListContainerProcessesResponse = {
    Titles: string[];
    Processes: string[][]
}

export type GetContainerLogsRequest = {
    id: string;
    follow?: boolean;
    stdout?: boolean;
    stderr?: boolean;
    since?: number;
    until?: number;
    timestamps?: boolean;
    tail?: string;
}