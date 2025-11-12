# ===============================
# Etapa 1: Build
# ===============================
FROM node:23

# Define o diretório de trabalho
WORKDIR /app

# Copia os arquivos de dependências
COPY package*.json ./

# Instala as dependências do projeto
RUN npm install

# Copia todo o código-fonte
COPY . .

# Substitui o environment padrão pelo de Docker
RUN cp src/environments/environment.docker.ts src/environments/environment.ts

# Expõe a porta padrão do Angular
EXPOSE 4200

# Comando de inicialização com hot reload
CMD ["npm", "run", "start", "--", "--host", "0.0.0.0"]
