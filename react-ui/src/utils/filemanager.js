import { createClient } from "webdav";

export function fileManager() {
    // return authorization header with jwt token
    let user = JSON.parse(localStorage.getItem('user'));

    const client = createClient("https://localhost:4443/filesystem", {
        token: { token_type: "Basic", access_token: user && user.basic_token }
    });

    return client;
}
