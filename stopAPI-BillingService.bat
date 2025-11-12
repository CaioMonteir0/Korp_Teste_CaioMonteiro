@echo off
title Korp BillingService Stop
echo ======================================
echo Encerrando BillingService...
echo ======================================

setlocal enabledelayedexpansion


REM === Parar BillingService (porta 5200) ===
for /f "tokens=5" %%a in ('netstat -ano ^| find ":5200" ^| find "LISTENING"') do (
    set PID=%%a
    if not "!PID!"=="" (
        echo Encontrado BillingService rodando na porta 5200 (PID !PID!)
        taskkill /PID !PID! /T /F >nul
        echo BillingService encerrado!
    )
)

echo =========================================
echo BillingService foi encerrado com sucesso.
echo =========================================
pause
