@echo off
echo ========================================
echo     MISE A JOUR DU REPOSITORY GIT
echo ========================================
echo.

REM Vérifie si c'est bien un repository Git
if not exist ".git" (
    echo ERREUR: Ce n'est pas un repository Git valide.
    pause
    exit /b 1
)

echo.
echo Recuperation des dernieres modifications...
git fetch origin

echo.
echo Mise a jour de la branche principale...
git pull origin main

if %errorlevel% equ 0 (
    echo.
    echo ✓ Mise a jour terminee avec succes !
) else (
    echo.
    echo ✗ Erreur lors de la mise a jour.
    echo Verifiez votre connexion internet et les conflits eventuels.
)

echo.
echo Retour au repertoire parent...
cd ..

echo.
pause