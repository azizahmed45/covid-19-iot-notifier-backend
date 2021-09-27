const express = require('express')
const app = express()
const axios = require('axios')
const port = process.env.PORT || 3000

app.get('/', async (req, res) => {

  let message = "";
  let response = await axios.get('https://api.thingspeak.com/channels/1510759/feeds.json?results=1')

  let data = response.data.feeds[0];

  if (Number(data.field5) > 37 || Number(data.field4) < 97 || Number(data.field3) < 89) {
    if (Number(data.field5) > 37) {
      message += " Higher Temperature "
    }

    if (Number(data.field4) < 92) {
      message += " and Lower SpO2 level "
    }

    if (Number(data.field3) > 100) {
      message += " and Higher pulse rate "
    }
    message += ` detected  Temperature: ${data.field5} SpO2 level ${data.field4}% pulse ${data.field3} of id number ${data.field1}, Name ${data.field2} at ${data.created_at}`

    await axios.post('https://fcm.googleapis.com/fcm/send', {
      "to": "/topics/all",
      "data": {
        "body": message,
        "title": "Covid Symptom Warning"
      }
    },
      {
        headers: {
          'Authorization': 'key=AAAA0zJEOhA:APA91bG7S_XMPFJdm_edVOSDPvpx_AJ_i3AH5M9Hs5w5L_MPF0c-bW8ogjxAANaWdx4qmXh-Nd6aQdpme8Y1_oJa7J7-8FI9gW80euWAfQ-oDQ5JkaU2Zwl77sUNzU_7lEIj4Aw3I0Q2',
          'Content-Type': 'application/json'
        },

      })
  }
  // .then(data => {
  //   console.log(data.data)
  // })
  //   .catch(error => {
  //     console.log(error)
  //   })
  res.send("Success");

})

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})