import axios from 'axios'

interface ITranslate {
  request: string
  language: string
  targetLanguage: string
  context: string
}

export const Translate = async (props: ITranslate) => {
  const language = props.language.trim()
  const targetLanguage = props.targetLanguage.trim()
  const context = props.context.trim()
  const request = props.request.trim()
  const data = JSON.stringify({
    prompt: `
Texto a ser traduzido: ${request}
Contexto: ${context}
Idioma de origem: ${language}
Idioma de destino: ${targetLanguage}

Me retorne somente o texto traduzido
`,
  })
  const config = {
    method: 'post',
    url: 'http://192.168.1.60:8080/translate',
    headers: {
      'Content-Type': 'application/json',
    },
    data: data,
  }

  return axios
    .request(config)
    .then((response) => {
      return response.data
    })
    .catch((error) => {
      console.log(error)
    })
}

export const Transcription = async (base64: string) => {
  try {
    const config = {
      method: 'POST',
      url: 'http://192.168.1.60:8080/transcription',
      headers: {
        'Content-Type': 'application/json',
      },
      data: JSON.stringify({
        fileName: `${Date.now()}.mp3`,
        file: base64,
      }),
    }

    return axios
      .request(config)
      .then((response) => {
        return response.data
      })
      .catch((error) => {
        console.log(error)
      })
  } catch (error) {
    console.log(error)
  }
}
