function buildResponse(statusCode, body) {
    return {
        statusCode: statusCode,
        headers: {
            "Content-Type": "application/json",
            "Access-Control-Allow-Headers": "Content-Type, X-Requested-With, Authorization",
            "Access-Control-Allow-Origin": "*", 
            "Access-Control-Allow-Methods": "OPTIONS, GET, POST", 
        },
        body: JSON.stringify(body)
    };
}

module.exports.buildResponse = buildResponse;
