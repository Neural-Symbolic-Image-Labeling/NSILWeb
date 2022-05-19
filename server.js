const { config } = require('./config');

// Init Database

// Start App
console.log("Starting application ...");

const { app } = require("./app");
app.listen(config.express.port, err => {
    if (err) {
        console.log("Unable to listen for connections", error)
    }
    else console.log(`Listening on port ${config.express.port}`)
})