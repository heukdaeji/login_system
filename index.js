const express = require('express')
const app = express()
const port = 3000

const mongoose = require('mongoose');
mongoose.connect('mongodb+srv://heukdaeji:byun0114*@login-system.s001ne4.mongodb.net/?retryWrites=true&w=majority', {}).then(() => {
    console.log("Sussy mongo");
}).catch(err => console.log(err))

app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})