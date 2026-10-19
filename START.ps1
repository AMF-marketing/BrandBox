param([ValidateRange(1024,65535)][int]$Port = 3001)
$ErrorActionPreference = 'Stop'
Set-Location -LiteralPath $PSScriptRoot
$nodeCommand = Get-Command node -ErrorAction SilentlyContinue
if ($nodeCommand) { $brandboxNode = $nodeCommand.Source }
else { $brandboxNode = Join-Path $env:USERPROFILE '.cache\codex-runtimes\codex-primary-runtime\dependencies\node\bin\node.exe' }
if (-not (Test-Path -LiteralPath $brandboxNode)) { throw 'Установите Node.js, затем повторите запуск.' }
$env:PORT = $Port.ToString()
Write-Host "BrandBox: http://127.0.0.1:$Port (Ctrl+C для остановки)"
& $brandboxNode serve.cjs out
