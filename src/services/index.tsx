import axios from 'axios'

interface ITranslate {
  request: string
  language: string
  targetLanguage: string
  context: string
}

const api = 'sk-Tl9aW7ugEck4vyvdfgAET3'
const key = 'BlbkFJ6nn98ji4RJ24zGoRmfNK'

export const Translate = async (props: ITranslate) => {
  const data = JSON.stringify({
    model: 'text-davinci-003',
    prompt: `
Texto a ser traduzido: ${props.request}
Contexto: ${props.context}
Idioma de origem: ${props.language}
Idioma de destino: ${props.targetLanguage}

Me retorne somente o texto traduzido
`,
    temperature: 1,
  })
  const config = {
    method: 'post',
    url: `https://api.openai.com/v1/completions`,
    headers: {
      Authorization: `Bearer ${api}${key}`,
      'Content-Type': 'application/json',
    },
    data: data,
  }

  return axios
    .request(config)
    .then((response) => {
      return response.data.choices[0].text
    })
    .catch((error) => {
      console.log(error)
    })
}
