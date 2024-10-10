import http from "http";

export class ContainerService {
    public static listContainers<T>(options: http.RequestOptions): Promise<T> {
        return new Promise((resolve, reject) => {
            const req = http.request(options, (res) => {
                let data = '';

                res.on('data', (chunk) => {
                    data += chunk;
                });

                res.on('end', () => {
                    try {
                        const parsedData: T = JSON.parse(data);
                        resolve(parsedData);
                    } catch (e) {
                        console.warn('Invalid response type, still returning for debug purposes!');
                        reject(data);
                    }
                });
            });

            req.on('error', (e) => {
                reject(e);
            });
            req.end();
        });
    }
}