const express = require('express');
const app = express();

app.get('/', (req, res) => {
    res.send('test worked')
})

const PORT = process.env.PORT | 3000
app.listen(3000, () => console.log(`Server started on port: ${PORT}`));