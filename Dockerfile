FROM node:20-alpine AS build
WORKDIR /usr/src/app

COPY package.json yarn.lock frontend.d.ts constants.ts ./
COPY tsconfig.json tsconfig.base.json webpack.common.ts webpack.config.ts ./

RUN echo "@ueno-tecnologia-org:registry=https://npm.pkg.github.com" > .npmrc && \
    echo "//npm.pkg.github.com/:_authToken=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" >> .npmrc
RUN yarn install

COPY nginx.template.conf entrypoint.sh ./
COPY ./public ./public
COPY ./src ./src

RUN yarn build

FROM nginx:alpine

COPY --from=build /usr/src/app/nginx.template.conf .
COPY --from=build /usr/src/app/entrypoint.sh .
COPY --from=build /usr/src/app/dist /usr/share/nginx/html

RUN chmod +x ./entrypoint.sh
EXPOSE 8080
ENTRYPOINT ./entrypoint.sh
