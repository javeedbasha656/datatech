function logger(uniqueId, message, error, reqData, resData) {

    let timestamp = Date.now()
    // logging the values
    let logs = {
        "uniqueId": uniqueId,
        "timestamp": timestamp,
        "message": message,
        "error": error,
        "requestData": reqData ? JSON.stringify(reqData) : '',
        "responseData": resData ? JSON.stringify(resData) : ''
    }
    // console.log(logs)

    // Storing log details in Db


}

export default logger;