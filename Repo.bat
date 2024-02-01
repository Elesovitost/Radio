@echo off
SET "gitPath=C:\Users\alesx\Documents\Git\bin\git.exe"
SET "repoPath=C:\Users\alesx\Documents\Radio"
SET "repoURL=https://github.com/Elesovitost/Radio.git"

if not exist "%repoPath%\.git" (
  "%gitPath%" clone "%repoURL%" "%repoPath%"
) else (
  cd /d "%repoPath%"
  "%gitPath%" pull origin main
)
