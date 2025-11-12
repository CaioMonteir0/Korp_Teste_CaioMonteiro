@echo off
title Korp Frontend Stop
echo ======================================
echo Encerrando Frontend Angular...
echo ======================================

setlocal enabledelayedexpansion


REM === Parar Frontend (porta 4200) ===
for /f "tokens=5" %%a in ('netstat -ano ^| find ":4200" ^| find "LISTENING"') do (
    set PID=%%a
    if not "!PID!"=="" (
        echo Encontrado Frontend Angular rodando na porta 4200 (PID !PID!)
        taskkill /PID !PID! /T /F >nul
        echo Frontend Angular encerrado!
    )
)

echo =========================================
echo Frontend Angular foi encerrado com sucesso.
echo =========================================
pause
