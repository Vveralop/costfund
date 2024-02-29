FROM node:16-alpine AS base

RUN apk add --no-cache git curl
RUN apk add openssl

ADD http://gitlab.itauchile.cl/architecture-center-of-excellence/api-connect/certificates/-/raw/main/itauchile/CAPrivate.crt "/usr/local/share/ca-certificates/CAPrivate.crt"
WORKDIR /usr/local/share/ca-certificates/
ADD http://secure.globalsign.com/itauprivaterootca2021.crt "itauprivaterootca2021.crt"
ADD http://secure.globalsign.com/itaumachineauthica2021.crt "itaumachineauthica2021.crt"
RUN openssl x509 -inform DER -in itauprivaterootca2021.crt -out itauprivaterootca2021.pem -outform PEM
RUN openssl x509 -inform DER -in itaumachineauthica2021.crt -out itaumachineauthica2021.pem -outform PEM
RUN cat "itaumachineauthica2021.pem" "itauprivaterootca2021.pem" > "CAFullItau.crt"
RUN update-ca-certificates

FROM base AS development

WORKDIR /usr/src/app
COPY package*.json ./
RUN npm install --only=development --loglevel verbose

FROM development AS builder

COPY . .
RUN npm run build

FROM base AS production

ARG NODE_ENV=production
ENV NODE_ENV=${NODE_ENV}
WORKDIR /usr/src/app
COPY package*.json ./
RUN npm install --only=production

COPY . .
COPY --from=builder /usr/src/app/dist ./dist
CMD ["node", "dist/main"]
