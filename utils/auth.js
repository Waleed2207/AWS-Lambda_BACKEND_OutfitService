// const jwt = require('jsonwebtoken');
// function generateToken(userInfo) {
//     if (!userInfo) {
//         console.error("Invalid user information provided for token generation.");
//         return null;
//     }

//     return jwt.sign(userInfo, process.env.JWT_SECRET, { expiresIn: '30s' });
    
// }
// function verifyToken(username,token) {
//     return jwt.verify(token, process.env.JWT_SECRET, (error, response) => {
//         if (error) {
//             return{
//                 verifeid : false,
//                 message: 'Invalid token provided'
//             }

//         }
//         if(response.username !== username) {
//             return{
//                 verifeid : false,
//                 message: 'Invalid User'
//             }
//         } 
        
//         return{
//             verifeid : true,
//             message: 'verified'
//         }
        
//     });

// }

// module.exports.generateToken=generateToken;
// module.exports.verifyToken=verifyToken;

const jwt = require('jsonwebtoken');
function generateToken(userInfo) {
    if (!userInfo) {
        console.error("Invalid user information provided for token generation.");
        return null;
    }
    return jwt.sign(userInfo, process.env.JWT_SECRET, { expiresIn: '1h' });
}

async function verifyToken(username, token) {
    try {
        const decoded = await new Promise((resolve, reject) => {
            jwt.verify(token, process.env.JWT_SECRET, (error, decoded) => {
                if (error) {
                    reject(error);
                } else {
                    resolve(decoded);
                }
            });
        });

        if (decoded.username !== username) {
            return {
                verified: false,
                message: 'Invalid User'
            };
        }

        return {
            verified: true,
            message: 'Verified'
        };
    } catch (error) {
        return {
            verified: false,
            message: 'Invalid token provided'
        };
    }
}

module.exports = { generateToken, verifyToken };
