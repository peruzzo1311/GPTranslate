const express = require('express')
const fs = require('fs')
const { Configuration, OpenAIApi } = require('openai')
const api = 'sk-Kz80hQTFkJMImRlMTdRwT3'
const key = 'BlbkFJH381fScLZzLXWRb0rS8B'
const app = express()
const configuration = new Configuration({
  apiKey: `${api}${key}`,
})
const openai = new OpenAIApi(configuration)

function base64ToFile(fileName, file) {
  fs.writeFile(`uploads/${fileName}`, file, 'base64', (error) => {
    if (error) {
      console.log(error)
    }
  })
}

app.use(express.json())

app.post('/translate', async (req, res) => {
  const { prompt } = req.body

  const response = await openai.createCompletion({
    model: 'text-davinci-003',
    prompt: prompt,
    max_tokens: 2048,
    temperature: 1.0,
  })

  res.send(response.data.choices[0].text)
})

app.post('/transcription', async (req, res) => {
  const { fileName, file } = req.body

  base64ToFile(fileName, file)

  const response = await openai.createTranscription(
    fs.createReadStream(`uploads/${fileName}`),
    'whisper-1'
  )

  res.send(response.data.text)

  fs.unlink(`uploads/${fileName}`, function (err) {
    if (err) {
      console.error(err)
    }
  })
})

app.listen(3000, () => {
  console.log('Server started on port 3000')
})
