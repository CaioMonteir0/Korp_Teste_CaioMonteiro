# ===============================
# Etapa 1: Build Angular
# ===============================
FROM node:23 AS build
WORKDIR /app

# Copia tudo para dentro do container
COPY . .

# Substituir o environment padrão pelo de Docker
RUN cp src/environments/environment.docker.ts src/environments/environment.ts

# Instala dependências e gera o build
RUN npm install
RUN npm run build --prod

# ===============================
# Etapa 2: Servidor NGINX
# ===============================
FROM nginx:alpine
COPY --from=build /app/dist/korp-angular/browser /usr/share/nginx/html

# Copia a configuração customizada
COPY nginx.conf /etc/nginx/conf.d/default.conf

EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]

