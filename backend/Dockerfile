FROM node:22-alpine AS shared-builder

WORKDIR /tmp/shared
COPY flow-shared .
RUN npm install
RUN npm run build
RUN npm pack   # creates flow-shared-x.x.x.tgz

# -----------------------

FROM node:22-alpine

WORKDIR /usr/src/app/backend

COPY backend/package*.json ./

# copy packed tarball
COPY --from=shared-builder /tmp/shared/*.tgz ./flow-shared.tgz

RUN npm install ./flow-shared.tgz

COPY backend/ .

EXPOSE 3000
CMD sh -c "npx prisma generate && npx prisma migrate dev --name init && npm run start:dev"
