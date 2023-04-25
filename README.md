# Tradutor com ChatGPT

O aplicativo Tradutor com ChatGPT é uma ferramenta que permite que os usuários traduzam textos em tempo real usando a API do ChatGPT. Com este aplicativo, os usuários podem traduzir textos em vários idiomas, dependendo da disponibilidade de suporte pela API do ChatGPT.

## Funcionamento

O usuário insere o texto que deseja traduzir no aplicativo e o servidor responsável pela aplicação envia uma requisição para a API do ChatGPT, que retorna a tradução em tempo real. O servidor é responsável por lidar com as informações e a requisição para a API do ChatGPT, sendo a chave para o funcionamento adequado do aplicativo.

## Como usar

#### Para abrir o aplicativo você deverá fazer os seguintes passos:

1. Para rodar o aplicativo, será necessário isntalar o Expo CLI através do comando:

```
npx expo -h
```

2. Após instalado a expo CLI, navegue até a pasta raíz do projeto e execute o seguinte comando:

```
npm install
```

3. Para que o aplicativo faça as requisições corretamente, você deverá alterar a variável url para o IPV4 da sua máquina. A variável está dentro de ./src/services/index.tsx

4. Após instalar as dependências, execute o comando para rodar o aplicativo:

```
npx expo start
```

#### Para abrir o servidor você deverá fazer os seguintes passos:

5. Navegue até a pasta ./api e execute o comando:

```
npm install
```

6. Após instalar as depêndencias do servidor, execute o comando:

```
npm run dev
```

7. Por fim, você precisará baixar o expoGo e escanear o QRCode mostrado no terminal para executar o aplicativo no seu celular
