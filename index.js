const express = require('express');
const app = express();
const users = require('./routes/users')
require('./db/mongoose');
require('./db/models/user');
app.use(express.json());
app.use('/api/users',users)

const port = 3000;
app.listen(port, () => console.log(`Example app listening on port ${port}!`))
