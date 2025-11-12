@echo off
title BillingService Startup
echo ============================================
echo Iniciando microservico Korp Billing Service
echo ============================================

:: Caminho do backend

cd /d "%~dp0backend"

:: ---- Inventory Service ----
echo.
echo Iniciando Billing Service na porta 5200...
cd BillingService && dotnet build && dotnet run

echo.
echo BillingService   -> http://localhost:5200
echo ============================================
pause