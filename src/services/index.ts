import axios from 'axios'

export const Translate = async (request: string, language: string) => {
  const apiKey = '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'
  const url = 'https://api.openai.com/v1/completions'

  try {
    const data = JSON.stringify({
      model: 'text-davinci-003',
      prompt: `Translate this to ${language}: ${request}`,
      max_tokens: 2048,
      temperature: 0.5,
    })

    const config = {
      method: 'post',
      url: url,
      headers: {
        Authorization: `Bearer ${apiKey}`,
        'Content-Type': 'application/json',
      },
      data: data,
    }

    return await axios
      .request(config)
      .then((response) => {
        return response.data.choices[0].text
      })
      .catch((error) => {
        console.log(error)
      })
  } catch (error) {
    console.log(error)
  }
}
