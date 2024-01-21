const {getErrorMessage} = require('../utils/errorHelpers');


exports.errorHandler = (err, req, res) => {
    req.render('/404', {error: getErrorMessage(err)})
}