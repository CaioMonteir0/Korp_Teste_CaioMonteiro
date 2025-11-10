@echo off
echo Encerrando microsservicos...
taskkill /FI "WindowTitle eq InventoryService*" /T /F
taskkill /FI "WindowTitle eq BillingService*" /T /F
echo Todos os servicos foram encerrados.
pause
