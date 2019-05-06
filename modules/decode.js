const fs = require('fs')
const path = require('path')

const pathJson = path.resolve(__dirname, 'tmp', 'answer.json')

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
    return console.log(result)
  })
}

module.exports = decodeJsonSave
