import {test, expect} from "@playwright/test";
import { TokenHelper } from "../../helpers/api-helpers/token/token-helper";
import {UserDataHelper} from "../../helpers/data-helpers/user.data.helper";

const user = UserDataHelper.getUser('api_admin');

let acceccToken: string, status: number;
test('should get token with valid credentials', async ({ request }) => {
    const tokenHelper = new TokenHelper();

    // get token
    await tokenHelper.getAccessToken(request, await user).then((value: any ) => {
        acceccToken = value;
    });

    // refresh token
    await tokenHelper.refreshAccessToken(request, acceccToken);

    //send email to recover password
    await tokenHelper.forgotPassword(request).then((value: any ) => {
        status = value;
    });
    await expect(status).toBe(204);
});