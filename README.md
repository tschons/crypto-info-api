<h1 style="text-align: center; color: cadetblue">Crypto-Info API</h1>

## Description

Authenticated API to check cryptocurrency prices.

<h3>Key Features:</h4>

<h4>For administrator profiles:</h4>

<ul>
    <li>User registration</li>
    <li>Update any users</li>
    <li>Update any user's password</li>
    <li>Get data from all users</li>
    <li>User search with filter</li>
    <li>User deletion</li>
    <li>Get cryptocurrency prices</li>
</ul>

<h4>For client profiles</h4>

<ul>
    <li>User update(name)</li>
    <li>User password update</li>
    <li>Get user data</li>
    <li>Get cryptocurrency prices</li>
</ul>

## Project setup

```bash
$ npm install
```

## Compile and run the project

```bash
# development
$ npm run start

# watch mode
$ npm run start:dev

# production mode
$ npm run start:prod
```

## Deployment

Expected environment variables and example values:

```
- ENVIRONMENT=development
- PORT=3000
- LOG_LEVELS=error,warn,log,debug,verbose
- DATABASE_HOST=mysql
- DATABASE_PORT=3306
- DATABASE_NAME=crypto_info
- DATABASE_USERNAME=db-user
- DATABASE_PASSWORD=PASSWORD
- AUTH_ACCESS_TOKEN_SECRET=SECRET
- AUTH_ACCESS_TOKEN_EXPIRATION=60s
- AUTH_REFRESH_TOKEN_SECRET=SECRET
- AUTH_REFRESH_TOKEN_EXPIRATION=24h
- CRYPTO_TARGET_FIAT_CURRENCY=BRL
- CRYPTO_PRICE_CACHE_MINUTES=10
- COINGECKO_API_URL=https://api.coingecko.com/api/v3/coins/markets
- COINGECKO_API_KEY=API_KEY
```

## Documentation

The API provides an interface via **Swagger** for describing and testing endpoints, available in the `/api` path.

## License

Crypto-Info API is [MIT licensed](https://github.com/nestjs/nest/blob/master/LICENSE).