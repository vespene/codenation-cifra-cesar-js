require('dotenv').config()

const request = require('request')
const fs = require('fs')
const path = require('path')

const pathJson = path.resolve(__dirname, 'tmp', 'answer.json')

const createJsonDesafio = () => {
  request(process.env.BASE_URL, (error, response, body) => {
    if (error) console.error('error:', error) // Print the error if one occurred
    console.log('statusCode:', response && response.statusCode) // Print the response status code if a response was received
    const result = body
    console.log(result)
    fs.writeFile(pathJson, result, err => {
      if (err) {
        console.log(err)
      } else {
        console.log('File was saved')
      }
    })
  })
}

module.exports = createJsonDesafio
