import { DockerClient } from "./controller";

const client = new DockerClient();

(async () => {
    try {
        const res = await client.containers.listContainers({
            all: true
        });
        console.log(res[0]);
    } catch (error) {
        console.error(error)
    }
})()