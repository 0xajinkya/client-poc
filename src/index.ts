import DockerClient from "./client";

const client = new DockerClient();

(async () => {
    try {
        const res = await client.listContainers({
            all: true,
            filters: {
                isolation: ["hyperv"]
            }
        });
        console.log(res);
    } catch (error) {
        console.error(error)
    }
})()