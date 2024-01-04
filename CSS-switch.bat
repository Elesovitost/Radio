@echo off
setlocal

echo Choose the theme conversion:
echo d = light to dark mode
echo l = dark to light mode
set /p mode="Enter your choice: "

if "%mode%"=="d" (
    set "ColorCmd=(Get-Content $file.PSPath) | ForEach-Object { $_ -replace '#000000', '#BCBCBC' -replace '#D3DCE9', '#404040' -replace '#EDEDED', '#555555' -replace '#D4A29C', '#8B0000' -replace '#E8E1D5', '#282828' -replace '#EDCC8B', '#84600A' -replace '#FFADAD', '#380000' -replace '#FFFFFF', '#121212' } | Set-Content $file.PSPath"
) else if "%mode%"=="l" (
    set "ColorCmd=(Get-Content $file.PSPath) | ForEach-Object { $_ -replace '#BCBCBC', '#000000' -replace '#404040', '#D3DCE9' -replace '#555555', '#EDEDED' -replace '#8B0000', '#D4A29C' -replace '#282828', '#E8E1D5' -replace '#84600A', '#EDCC8B' -replace '#380000', '#FFADAD' -replace '#121212', '#FFFFFF' } | Set-Content $file.PSPath"
) else (
    echo Invalid choice. Please run the script again and choose a valid option.
    goto :eof
)

REM Check for CSS files in the current directory
if not exist *.css (
    echo No CSS files found in the current directory.
    goto :eof
)

REM Execute the PowerShell command
echo Processing CSS files...
powershell -NoProfile -ExecutionPolicy Bypass -Command "foreach ($file in Get-ChildItem -Path . -Filter *.css) { try { %ColorCmd% } catch { Write-Error 'Error processing file: $file' } }"

if "%mode%"=="d" (
    echo Colors have been replaced for dark mode.
) else (
    echo Colors have been restored to light mode.
)

