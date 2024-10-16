const registerService = require('./service/register');
const loginService = require('./service/login');
// const outfitService = require('./service/outfit'); // Uncomment and implement if needed
const verifyService = require('./service/verify');
const utils = require('./utils/util');

const outfitPath = '/OUTFIT';
const registerPath = '/register';
const loginPath = '/login';
const verifyPath = '/verifiy'; // Corrected the typo here

exports.handler = async (event) => {
    console.log('Request Event: ', event);
    let response;

    switch (true) {
        case event.httpMethod === 'GET' && event.path === outfitPath:
            // Implement and call outfitService.getOutfits() if needed
            response = utils.buildResponse(200, "Outfit data retrieved"); // Example message
            break;
        case event.httpMethod === 'POST' && event.path === registerPath:
            const registerBody = JSON.parse(event.body);
            response = await registerService.register(registerBody);
            break;
        case event.httpMethod === 'POST' && event.path === loginPath:
            const loginBody = JSON.parse(event.body);
            response = await loginService.login(loginBody); // Added await for consistency
            break;
        case event.httpMethod === 'POST' && event.path === verifyPath:
            const verifyBody = JSON.parse(event.body);
            response = await verifyService.verify(verifyBody); // Added await for consistency
            break;
        default:
            response = utils.buildResponse(404, 'Not Found');
            break;
    }

    return response;
};
