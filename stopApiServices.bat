@echo off

echo ======================================
echo Encerrando microsservicos...
echo ======================================

setlocal enabledelayedexpansion

REM === Parar InventoryService (porta 5100) ===
for /f "tokens=5" %%a in ('netstat -ano ^| find ":5100" ^| find "LISTENING"') do (
    set PID=%%a
    if not "!PID!"=="" (
        echo Encontrado InventoryService rodando na porta 5100 (PID !PID!)
        taskkill /PID !PID! /T /F >nul
        echo InventoryService encerrado!
    )
)

REM === Parar BillingService (porta 5200) ===
for /f "tokens=5" %%a in ('netstat -ano ^| find ":5200" ^| find "LISTENING"') do (
    set PID=%%a
    if not "!PID!"=="" (
        echo Encontrado BillingService rodando na porta 5200 (PID !PID!)
        taskkill /PID !PID! /T /F >nul
        echo BillingService encerrado!
    )
)

echo ======================================
echo Todos os servicos foram encerrados.
echo ======================================
pause
