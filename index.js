require('dotenv').config()

const fs = require('fs')
const path = require('path')
const crypto = require('crypto')
const request = require('request')

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

const decodeFrase = (frase, number) => {
  const num = number < 0 ? 26 : number
  let output = ''

  for (let i = 0; i < frase.length; i++) {
    const code = frase.charCodeAt(i)
    let c = ''

    if (code >= 65 && code <= 90) {
      c = String.fromCharCode((code - num) % 26)
    } else if (code >= 97 && code <= 122) {
      if (code - num < 97) {
        c = String.fromCharCode(code - num + 122 - 97 + 1)
      } else {
        c = String.fromCharCode(code - num)
      }
    } else {
      if (code === 32) {
        c = ' '
      } else if (code === 58) {
        c = String.fromCharCode(code)
      } else if (code === 46) {
        c = String.fromCharCode(code)
      }
    }
    output += c
  }
  return output
}

const decodeJsonSave = () => {
  fs.readFile(pathJson, (err, data) => {
    if (err) {
      throw err
    }
    const dataJson = JSON.parse(data)
    const result = decodeFrase(dataJson.cifrado, dataJson.numero_casas)
    dataJson['decifrado'] = result
    fs.writeFile(pathJson, JSON.stringify(dataJson), err => {
      if (err) {
        console.log(err)
      } else {
        console.log('File was saved')
      }
    })
    return result
  })
}

const criptoTexto = texto => {
  const frase = crypto
    .createHash('sha1')
    .update(texto)
    .digest('hex')

  return frase
}

const cryptoResumeSha1 = () => {
  fs.readFile(pathJson, (err, data) => {
    if (err) {
      throw err
    }
    const dataJson = JSON.parse(data)
    const result = criptoTexto(dataJson.decifrado)
    dataJson['resumo_criptografico'] = result
    fs.writeFile(pathJson, JSON.stringify(dataJson), err => {
      if (err) {
        console.log(err)
      } else {
        console.log('File was saved')
      }
    })
    return result
  })
}

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

// createJsonDesafio()
// decodeJsonSave()
// cryptoResumeSha1()
// sendDesafio()
