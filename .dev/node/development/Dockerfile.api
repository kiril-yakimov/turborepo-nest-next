FROM node:lts-alpine

ENV NODE_ENV=${ENVIRONMENT}

RUN echo "Targeted enviroment $ENVIRONMENT"

WORKDIR /app

RUN yarn add -g @nestjs/cli \
    @mikro-orm/cli \
    @mikro-orm/postgresql

CMD ["sh", "-c", "yarn dev --filter=api"]
