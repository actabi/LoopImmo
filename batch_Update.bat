@echo off
REM ====================================================
REM Mise à jour du repo avec origin/main sans reset hard
REM Les changements locaux sont préservés.
REM ====================================================

echo.
echo ----------------------------------------
echo Dossier courant :
cd
echo ----------------------------------------

REM Vérifie que tu es bien dans un repo git
if not exist ".git" (
    echo ERREUR : Ce dossier n'est pas un repository Git.
    pause
    exit /b 1
)

REM 1. Affiche le remote utilisé
echo.
echo Remote(s) de ce repo :
git remote -v

REM 2. Récupère tous les changements distants
echo.
echo === git fetch origin ===
git fetch origin

REM 3. Se place sur la branche main (ou crée la si nécessaire)
echo.
echo === git checkout main ===
git checkout main 2>nul || git checkout -b main origin/main

REM 4. Applique les mises à jour distantes (merge)
echo.
echo === git pull origin main ===
git pull origin main

REM 5. Affiche le statut et les derniers commits
echo.
echo Statut du repo :
git status

echo.
echo Derniers commits (local et distant) :
git log --oneline -3

echo.
echo ----------------------------------------
echo Mises à jour terminées : votre branche main est à jour.
echo ----------------------------------------

pause
