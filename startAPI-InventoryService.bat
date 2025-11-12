@echo off
title InventoryService Startup
echo ============================================
echo Iniciando microservicos Korp InventoryService
echo ============================================

:: Caminho do backend

cd /d "%~dp0backend"

:: ---- Inventory Service ----
echo.
echo Iniciando Inventory Service na porta 5100...
cd InventoryService && dotnet build && dotnet run

echo.
echo InventoryService -> http://localhost:5100
echo ============================================
pause