import axios from 'axios'

interface ITranslate {
  request: string
  language: string
  targetLanguage: string
  context: string
}

export const Translate = async (props: ITranslate) => {
  const data = JSON.stringify({
    prompt: `
Texto a ser traduzido: ${props.request}
Contexto: ${props.context}
Idioma de origem: ${props.language}
Idioma de destino: ${props.targetLanguage}

Me retorne somente o texto traduzido
`,
  })
  const config = {
    method: 'post',
    url: 'http://192.168.1.60:3000/translate',
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
      url: 'http://192.168.1.60:3000/transcription',
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
