const express = require('express');
const cors = require('cors');
const path = require('path');
const { dir } = require('console');

const app = express();

// Static resources
app.use(express.static(path.join(__dirname, "frontend", "build")));

app.use(cors({
    origin: true,
    optionsSuccessStatus: 200
}));

app.use(express.json())
app.use(express.urlencoded({ extended: true }));

// TODO: Database checking if any

// Routers

// 404 Error or ignoring frontend router
app.use("*", (req, res) => {
    res.sendFile(path.join(__dirname, "frontend", "build", "index.html"));
});

module.exports = {
    app
};