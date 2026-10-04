# Trabalho de React Native – Consumo de API

App mobile em React Native + Expo (JavaScript) que consome a [DummyJSON](https://dummyjson.com/) (substituta da Fake Store API, que estava instável/fora do ar), com login, listagem de produtos com filtro por categoria, detalhes de produto e tela de informações do grupo.

## Como rodar o projeto

1. Instale as dependências:
   ```bash
   npm install
   ```
2. Inicie o projeto com o Expo:
   ```bash
   npx expo start
   ```
3. Escaneie o QR Code com o app **Expo Go** (Android/iOS) ou rode num emulador.

## Como verificar os usuários disponíveis para login

A DummyJSON expõe a lista de usuários de teste no endpoint:

```
GET https://dummyjson.com/users
```

Você pode abrir essa URL no navegador (ou usar Postman/Insomnia) para ver os usernames disponíveis. A senha de todos os usuários de teste segue o padrão `<username>pass` (ex.: usuário `emilys` → senha `emilyspass`). Vale conferir a senha exata de cada usuário na própria listagem antes de usar.

## Integrantes do grupo

| Nome completo | RA |
|---|---|
| Ariel David de Almeida Chaves | 1136093 |
| Diego Meira | 1109435 |
| Luis Eduardo | 1134332_ |
| Kael Fuchs Zatti | 1137819 |
## Estrutura do projeto

```
App.js
src/
  context/
    AuthContext.js      -> estado global de autenticação (Context API)
  navigation/
    AppNavigator.js      -> Stack de navegação (login / área logada)
  screens/
    LoginScreen.js
    HomeScreen.js
    ProductDetailScreen.js
    GroupInfoScreen.js
  services/
    api.js                -> instância do axios com a baseURL da API
  utils/
    formatPrice.js         -> formatação de preço em R$
```
