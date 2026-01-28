FROM node:22-alpine AS shared-builder

WORKDIR /tmp/shared
COPY flow-shared .
RUN npm install
RUN npm run build
RUN npm pack   # creates flow-shared-x.x.x.tgz

# -----------------------

FROM node:22-alpine

WORKDIR /usr/src/app/flow-frontend

COPY frontend/flow-frontend/package*.json ./

# copy packed tarball
COPY --from=shared-builder /tmp/shared/*.tgz ./flow-shared.tgz

RUN npm install ./flow-shared.tgz

RUN npm install -g @angular/cli
RUN npm install

COPY frontend/flow-frontend .

EXPOSE 4200
CMD sh -c "npm run start:local"
