@echo off
title Korp Frontend Startup
echo ============================================
echo Iniciando frontend Angular (korp-angular)
echo ============================================


cd /d "%~dp0frontend\korp-angular"

:: Verifica se o Angular CLI está instalado
where ng >nul 2>nul
if %errorlevel% neq 0 (
    echo Angular CLI nao encontrado! Instalando globalmente...
    npm install -g @angular/cli
)

:: Instala dependencias se necessario
if not exist "node_modules" (
    echo Instalando dependencias npm...
    call npm install
)

:: Inicia o servidor Angular
echo.
echo Servindo aplicacao em http://localhost:4200
echo Pressione CTRL+C para encerrar o frontend.
echo ============================================
call ng serve --open
