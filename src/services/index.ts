import axios from 'axios'
import { Alert } from 'react-native'

interface ITranslate {
  request: string
  language: string
  targetLanguage: string
  context: string
}

export const Translate = async (props: ITranslate) => {
  const apiKey = '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'
  const url = 'https://api.openai.com/v1/completions'
  const language = props.language.trim()
  const targetLanguage = props.targetLanguage.trim()
  const context = props.context.trim()
  const request = props.request.trim()

  try {
    const data = JSON.stringify({
      model: 'text-davinci-003',
      prompt: `
        Texto a ser traduzido: ${request}
        Contexto: ${context}
        Idioma de origem: ${language}
        Idioma de destino: ${targetLanguage}
      `,
      max_tokens: 2048,
      temperature: 0.5,
      top_p: 1.0,
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

        Alert.alert('Erro', 'Erro ao traduzir o texto.')
      })
  } catch (error) {
    console.log(error)
  }
}
