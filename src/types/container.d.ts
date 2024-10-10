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

export type CreatedContainer = {
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
    HostConfig?: {
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
    },
    NetworkingConfig?: {
        EndpointsConfig?: {
            [key: string]: object
        }
    }
};

export type CreateContainerInput = {
    name: string,
    platform?: string,
} & CreatedContainer

export type BlkioDeviceBps = {
    Path: string,
    Rate: number
}