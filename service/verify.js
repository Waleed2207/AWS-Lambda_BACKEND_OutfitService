// verify.js
const utils = require('../utils/util');
const auth = require('../utils/auth');

async function verify(requestBody) {
    if (!requestBody.user || !requestBody.user.username || !requestBody.token) {
        return utils.buildResponse(401, {
            verified: false,
            message: 'Incorrect request body'
        });
    }

    // const user = requestBody.user;
    // const { token } = requestBody;
    // const verification = auth.verifyToken(user.username,token); // Correct usage of auth.verifyToken

    // if (!verification.verified) {
    //     return utils.buildResponse(401,verification);
    // }
    const { user, token } = requestBody;
    const verification = await auth.verifyToken(user.username, token);

    if (!verification.verified) {
        return utils.buildResponse(401, verification);
    }

    return utils.buildResponse(200, {
        verified: true,
        message: 'Success',
        user: user,
        token: token
    });
}

module.exports.verify = verify; // Correct export
