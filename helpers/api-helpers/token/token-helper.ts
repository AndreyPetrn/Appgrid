const apiData = require('../index.ts');

export class TokenHelper {

    async getAccessToken(request, user): Promise<any> {
        return new Promise((resolve) => {
            request.post(apiData.token, {
                header: {
                    'Content-Type': 'application/json'
                },
                data: {
                    grant_type: user.grantType,
                    username: user.name,
                    password: user.password,
                    client_id: user.clientID,
                    code: user.code
                }})
                .then(function (result) {
                    const status = JSON.parse(JSON.stringify(result._initializer.status));
                    resolve(status);
                    console.log('status--> ', status);
                })
        });
    };

    async refreshAccessToken(request, token): Promise<any> {
        return new Promise((resolve) => {
            request.post(apiData.token, {
                header: {
                    'Content-Type': 'application/json'
                },
                data: {
                    grant_type: "refresh_token",
                    refresh_token: `"${token}"`
                }})
                .then(function (result) {
                    const refreshStatus = JSON.parse(JSON.stringify(result._initializer.status));
                    resolve(refreshStatus);
                    console.log('status--> ', refreshStatus);
                })
        });
    };

    async forgotPassword(request): Promise<any> {
        return new Promise((resolve) => {
            request.post(apiData.core + 'password-forgot', {
                header: {
                    'Content-Type': 'application/json'
                },
                data: {
                    email: "stells318@gmail.com"
                }})
                .then(function (result) {
                    const status = JSON.parse(JSON.stringify(result._initializer.status));
                    resolve(status);
                })
        });
    };
}