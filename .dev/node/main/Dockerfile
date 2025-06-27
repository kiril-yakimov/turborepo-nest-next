FROM node:lts-alpine AS builder

WORKDIR /usr/src/

# Set HUSKY=0 as an ENV variable
ENV HUSKY=0

COPY package.json ./

# Install dependencies
RUN yarn install --prod

COPY . .
COPY ./migrations ./src/migrations

RUN yarn build

FROM node:lts-slim

WORKDIR /app

COPY --from=builder /usr/src/dist /app/
COPY --from=builder /usr/src/node_modules /app/node_modules
COPY --from=builder /usr/src/tsconfig.json /app

EXPOSE 3000

CMD ["yarn", "prod"]
