@echo off
setlocal enabledelayedexpansion
chcp 65001 >nul

echo ========================================
echo        COMMIT DES MODIFICATIONS
echo ========================================
echo.

REM Vérifie si c'est bien un repository Git
if not exist ".git" (
    echo ERREUR: Ce n'est pas un repository Git valide.
    pause
    exit /b 1
)

echo.
echo Verification des modifications...
git status

echo.
echo Ajout de tous les fichiers modifies...
git add .

echo.
set /p commit_message="Entrez votre message de commit: "

if "%commit_message%"=="" (
    echo ERREUR: Le message de commit ne peut pas etre vide.
    pause
    exit /b 1
)

echo.
echo Creation du commit...
git commit -m "%commit_message%"

if %errorlevel% equ 0 (
    echo.
    echo ✓ Commit cree avec succes !
    echo.
    
    set /p push_choice="Voulez-vous pousser vers le repository distant ? (y/n): "
    echo Vous avez entre : '[!push_choice!]'
    
    rem On ne garde que la première lettre
    set "choice=!push_choice:~0,1!"
    
    if /i "!choice!"=="y" (
        echo.
        echo Push vers le repository distant...
        git push origin HEAD
        
        if !errorlevel! equ 0 (
            echo ✓ Push termine avec succes !
        ) else (
            echo ✗ Erreur lors du push. Verifiez vos permissions et votre connexion.
        )
    ) else (
        echo Commit local uniquement. N'oubliez pas de faire un push plus tard.
    )
) else (
    echo.
    echo ✗ Erreur lors de la creation du commit.
    echo Verifiez qu'il y a des modifications a committer.
)

echo.
echo Appuyez sur une touche pour fermer...
pause >nul