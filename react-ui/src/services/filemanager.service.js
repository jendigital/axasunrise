import { createClient } from "webdav";

export const filemanagerService = {
    connect
};

function connect(login, password) {
    const client = createClient(
        "https://localhost:4443/filesystem",
        {
            username: login,
            password: password
        }
    );

    console.log(client)

    return client
}
