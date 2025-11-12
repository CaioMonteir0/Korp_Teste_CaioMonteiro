# ===============================
# Etapa 1: Build
# ===============================
FROM mcr.microsoft.com/dotnet/sdk:9.0 AS build
WORKDIR /src

# Copia tudo
COPY . .
WORKDIR /src/backend/InventoryService

# Restaura e publica
RUN dotnet restore
RUN dotnet publish -c Release -o /app/publish

# ===============================
# Etapa 2: Runtime
# ===============================
FROM mcr.microsoft.com/dotnet/aspnet:9.0 AS runtime
WORKDIR /app
EXPOSE 5100

COPY --from=build /app/publish .
ENV ASPNETCORE_URLS=http://+:5100
ENV ASPNETCORE_ENVIRONMENT=Development
ENTRYPOINT ["dotnet", "InventoryService.dll"]
