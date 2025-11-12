@echo off
title Korp Services Startup
echo ============================================
echo Iniciando microservicos Korp (Inventory + Billing)
echo ============================================

:: Caminho do backend

cd /d "%~dp0backend"

:: ---- Inventory Service ----
echo.
echo [1/2] Iniciando Inventory Service na porta 5100...
start "InventoryService Startup" cmd /k "cd InventoryService && dotnet build && dotnet run"

:: ---- Billing Service ----
echo.
echo [2/2] Iniciando Billing Service na porta 5200...
start "BillingService Startup" cmd /k "cd BillingService && dotnet build && dotnet run"


echo.
echo Todos os servicos foram iniciados em janelas separadas!
echo InventoryService -> http://localhost:5100
echo BillingService   -> http://localhost:5200
echo ============================================
pause