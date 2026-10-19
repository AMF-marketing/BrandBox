@echo off
setlocal
cd /d "%~dp0"
set "PORT=3001"
set "BRANDBOX_NODE=%USERPROFILE%\.cache\codex-runtimes\codex-primary-runtime\dependencies\node\bin\node.exe"
if exist "%BRANDBOX_NODE%" goto run
where node >nul 2>nul
if errorlevel 1 goto missing
set "BRANDBOX_NODE=node"
:run
"%BRANDBOX_NODE%" serve.cjs out
pause
exit /b
:missing
echo Node.js was not found. Install Node.js and try again.
pause
exit /b 1
