import { DockerClient } from "./controller";

const client = new DockerClient();

(async () => {
    try {
        // const res = await client.containers.listContainers({
        //     all: true
        // });
        // const res = await client.containers.createContainer({
        //     name: "node",
        //     Image: "node:latest",
            
        // })
        // const res = await client.containers.inspectContainer({
        //     id: "3b917b5a1bf16cf88db564b8332a328deaa12b17a1caa8c8abe645b7cde44460",
        //     size: true,
        // });

        // const res = await client.containers.listContainerProcesses({
        //     id: "85682ca1a559b9f6d45b94c6f837ade2fa511d72358c88c326fd191fd66988f8",
        //     ps_args: "aux",
        // })
        // const res = await client.containers.getContainerLogs({
        //     id: "85682ca1a559",
        //     stdout: true
        // })
        // const res = await client.containers.getChanges({
        //     id: "f20f118a3d58"
        // })
        const res = await client.containers.getContainerLogs({
            id: "85682ca1a559",
        });
        console.log(res); 
    } catch (error) {
        console.error(error)
    }
})()