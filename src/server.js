const express = require("express")
const axios = require("axios")
const ClientOAuth2 = require('client-oauth2')
const signals = require("./signals")

const PORT = +(process.env.PORT || '3000')

const ID_HOST = process.env.ID_HOST

const cpidAuth = new ClientOAuth2({
  clientId: process.env.CLIENT_ID || '0zptSHV9n2p93fJTCQNYm7-ghWmrza4qg6iKVaLl3OQ',
  clientSecret: process.env.CLIENT_SECRET || 'iVUBPgZULmhDurYtkugRnWCllRn5rapnwi7k5mWeFNA',
  accessTokenUri: `${ID_HOST}/api/oauth/token`,
  authorizationUri: `${ID_HOST}/authorize`,
  redirectUri: `http://localhost:${PORT}/auth/cpid/callback`,
  scopes: ["read", "email", "phone", "full_name", "birthday", "gender", "snils", "vehicles"]
})

const app = express()
app.set('view engine', 'ejs')
app.use(express.static('public'))

app.get("/", (_req, res) => {
  return res.render('auth/index')
})

app.get("/auth/cpid", (_req, res) => {
  const uri = cpidAuth.code.getUri()
  res.redirect(uri)
})

app.get("/auth/cpid/callback", async (req, res) => {
  try {
    const user = await cpidAuth.code.getToken(req.originalUrl)

    const { data } = await axios(user.sign({
      method: 'get',
      url: `${ID_HOST}/api/v1/me.json`
    }))

    return res.render('auth/success', { data: JSON.stringify(data, null, 4) })
  } catch(e) {
    return res.send(e)
  }
})

console.log(`\nServer run at http://localhost:${PORT}\n`)

const server = app.listen(PORT)

signals.listen(server)
