const express = require('express')
const app = express()
const axios = require('axios')
const port = 3000 || process.env.PORT

app.get('/', async (req, res) => {
  
  let data = await axios.get('https://api.thingspeak.com/channels/1510759/feeds.json?results=1')

  res.send(data.data);

})

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})