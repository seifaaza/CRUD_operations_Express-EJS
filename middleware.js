const loggingMiddleware = (req, res, next) => {
    console.log(`Date : ${new Date().toISOString()} - Method : ${req.method} - Url : ${req.url}`);
    next()
}

const errorHandlingMiddleware = (err, req, res, next) => {
    res.status(err).json({ error: err.message });
    console.log("hello");
    next()
}
  
module.exports = {loggingMiddleware, errorHandlingMiddleware}