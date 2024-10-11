import { request, type RequestOptions } from "http";
export const handleRequest = <T>(options: RequestOptions, body?: any): Promise<T> => {
    return new Promise((resolve, reject) => {
        const req = request(options, (res) => {
            let data = '';

            res.on('data', (chunk) => {
                data += chunk;
            });

            res.on('end', () => {
                try {
                    const parsedData = typeof data === 'string' ? data : JSON.parse(data);
                    resolve(parsedData);
                } catch (e) {
                    console.log(e)
                    console.warn('Invalid response type, still returning for debug purposes!');
                    reject(data);
                }
            });
        });
        req.on('error', (e) => {
            reject(e);
        });
        if (body) req.write(JSON.stringify(body));
        req.end();
    });
};

export const http = {
    handleRequest
};