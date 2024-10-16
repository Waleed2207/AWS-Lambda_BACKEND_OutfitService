const AWS = require('aws-sdk');
AWS.config.update({
    region: 'us-east-1',
});

const utils = require('../utils/util');
const auth = require('../utils/auth');
const bcrypt = require('bcryptjs');
const dynamodb = new AWS.DynamoDB.DocumentClient();
const userTable = 'RevampedAI-USER';

async function login(user) {
    const username = user.username;
    const password = user.password;

    if (!user || !username || !password) {
        return utils.buildResponse(401, {
            message: 'Username and password are required'
        });
    }

    const dynamoUser = await getUser(username);
    if (!dynamoUser || !dynamoUser.username) {
        return utils.buildResponse(403, {
            message: 'User does not exist'
        });
    }

    if (!bcrypt.compareSync(password, dynamoUser.password)) {
        return utils.buildResponse(401, {
            message: 'Password is incorrect'
        });
    }

    const userInfo = {
        username: dynamoUser.username,
        password : dynamoUser.password
    };

    const token = auth.generateToken(userInfo);
    const response = {
        user: userInfo,
        token: token
    };
    return utils.buildResponse(200, response);
}

async function getUser(username) {
    const params = {
        TableName: userTable,
        Key: {
            username: username
        }
    };

    try {
        const response = await dynamodb.get(params).promise();
        return response.Item;
    } catch (error) {
        console.error('There is an error getting user: ', error);
        return null; // or handle as per your application's error handling strategy
    }
}

module.exports.login = login;
