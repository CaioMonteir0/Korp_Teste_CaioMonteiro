@echo off
title Parar Frontend Angular
echo ============================================
echo Encerrando servidor Angular (korp-angular)
echo ============================================

:: Tenta localizar o processo do Angular CLI
for /f "tokens=5" %%a in ('netstat -ano ^| find ":4200" ^| find "LISTENING"') do (
    echo Encontrado processo na porta 4200 (PID %%a)
    taskkill /PID %%a /T /F >nul
    echo Servidor Angular encerrado com sucesso!
    goto fim
)

echo Nao foi encontrado nenhum servidor Angular rodando na porta 4200.
:fim
pause
