## Development

`yarn install`
`PORT=3001 node src/server.js`

Open
http://localhost:3001/auth/cpid

## Build

`docker build -t cpid-oauth-example:latest .`

## Run

`docker run -p 3001:3000 -it --rm cpid-oauth-example:latest`
