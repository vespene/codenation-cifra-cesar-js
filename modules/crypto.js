const crypto = require('crypto')
const fs = require('fs')
const path = require('path')

const pathJson = path.resolve(__dirname, 'tmp', 'answer.json')

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
    console.log(result)
    console.log(dataJson.decifrado)
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

module.exports = cryptoResumeSha1
