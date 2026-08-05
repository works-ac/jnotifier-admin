FROM node:24-alpine AS builder
WORKDIR /app


COPY package*.json ./

RUN npm install --legacy-peer-deps
COPY . .

ARG PORT=3663
ARG VITE_WHATSAPP_CHANNEL_LINK
ARG VITE_TELEGRAM_CHANNEL_LINK
ARG VITE_API_BASE_URL
ARG VITE_PRODUCTION_ADMIN_PANEL_URL
ARG VITE_APP_VERSION

ENV EXPOSE_PORT=${PORT}
ENV VITE_API_BASE_URL=${VITE_API_BASE_URL}
ENV VITE_WHATSAPP_CHANNEL_LINK=${VITE_WHATSAPP_CHANNEL_LINK}
ENV VITE_TELEGRAM_CHANNEL_LINK=${VITE_TELEGRAM_CHANNEL_LINK}
ENV VITE_PRODUCTION_ADMIN_PANEL_URL=${VITE_PRODUCTION_ADMIN_PANEL_URL}
ENV VITE_APP_VERSION=${VITE_APP_VERSION}

RUN npm run build

FROM nginx:alpine

COPY nginx.conf /etc/nginx/conf.d/default.conf
COPY --from=builder /app/dist /usr/share/nginx/html

RUN touch /var/run/nginx.pid && \
  chown -R nginx:nginx /var/run/nginx.pid /var/cache/nginx /var/log/nginx /etc/nginx/conf.d /usr/share/nginx/html
USER nginx

EXPOSE ${EXPOSE_PORT}
CMD ["nginx", "-g", "daemon off;"]