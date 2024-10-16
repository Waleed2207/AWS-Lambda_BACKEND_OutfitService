const AWS = require('aws-sdk');
AWS.config.update({
    region: 'us-east-1',
});

const utils = require('../utils/util');
const bcrypt = require('bcryptjs');
const dynamodb = new AWS.DynamoDB.DocumentClient();
const userTable = 'RevampedAI-USER';

async function register(userInfo) {
    const name = userInfo.name;
    const email = userInfo.email;
    const username = userInfo.username;
    const password = userInfo.password;

    if (!username || !name || !email || !password) {
        return utils.buildResponse(401, {
            message: 'All fields are required'
        });
    }

    const dynamoUser = await getUser(username);
    if (dynamoUser && dynamoUser.username) {
        return utils.buildResponse(401, {
            message: 'User already exists in our database. Please choose a different username'
        });
    }

    const encryptedPW = bcrypt.hashSync(password.trim(), 10);
    const user = {
        name: name,
        email: email,
        username: username.toLowerCase().trim(),
        password: encryptedPW
    };

    const saveUserResponse = await saveUser(user);
    if (!saveUserResponse) {
        return utils.buildResponse(503, { message: 'Server Error, Please try again later' });
    }

    return utils.buildResponse(200, { username: username });
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
    }
}

async function saveUser(user){
    const params = {
        TableName: userTable,
        Item: user
    }

    return await dynamodb.put(params).promise().then(() => {
        return true;
    },error =>{
        console.log('There is an error Saving user: ', error);
    });

}

module.exports.register = register;
