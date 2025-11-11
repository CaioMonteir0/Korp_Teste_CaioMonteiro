@echo off
title Parar Frontend Angular (porta 4200)
echo ============================================
echo Encerrando servidor Angular (porta 4200)
echo ============================================
echo.

setlocal enabledelayedexpansion

:: Tenta encontrar o PID que está escutando na porta 4200
echo Procurando processo usando a porta 4200...
for /f "tokens=5" %%a in ('netstat -ano ^| findstr ":4200" ^| findstr "LISTENING"') do (
    set PID=%%a
)

:: Verifica se encontrou
if defined PID (
    echo Processo encontrado (PID: !PID!)
    echo Encerrando processo...
    taskkill /PID !PID! /T /F >nul 2>&1

    if !errorlevel! == 0 (
        echo Servidor Angular encerrado com sucesso!
    ) else (
        echo ⚠️  Nao foi possivel encerrar o processo (PID !PID!).
        echo Tentando forcar encerramento via tskill...
        tskill !PID! >nul 2>&1
    )
) else (
    echo Nenhum processo encontrado escutando na porta 4200.
)

echo.
echo ============================================
echo Script finalizado.
echo Pressione qualquer tecla para sair...
pause >nul

endlocal
exit /b
