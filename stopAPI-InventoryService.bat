@echo off
title InventoryService Stop
echo ======================================
echo Encerrando InventoryService...
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


echo =======================================
echo InventoryService encerrado com sucesso.
echo =======================================
pause
