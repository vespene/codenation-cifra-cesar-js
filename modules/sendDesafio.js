require('dotenv').config()

const fs = require('fs')
const path = require('path')
const request = require('request')

const pathJson = path.resolve(__dirname, 'tmp', 'answer.json')

const sendDesafio = async () => {
  const headers = {
    'Content-Type': 'multipart/form-data'
  }
  const r = request.post(
    { url: process.env.API_URL, headers },
    function optionalCallback (err, httpResponse, body) {
      if (err) {
        return console.error('upload failed:', err)
      }
      console.log('Upload successful!  Server responded with:', body)
    }
  )
  const form = r.form()
  form.append('answer', fs.createReadStream(pathJson), {
    filename: 'answer.json'
  })
}

module.export = sendDesafio
