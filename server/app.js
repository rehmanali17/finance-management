const express = require('express');
const cors = require('cors');
const passport = require('passport');
const routes = require(process.cwd() + '/src/routes/index');
const { dbConnection } = require(process.cwd() + '/src/config/connection');

const app = express();
app.use(cors());
app.use(passport.initialize());
app.use(express.json({ limit: '50mb' }));
app.use(express.static(process.cwd() + '/src/public'));

dbConnection(app);

app.use('/api', routes);

app.get("*", (req, res) => {
    res.sendFile(process.cwd() + '/src/public/index.html');
});
