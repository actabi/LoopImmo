@echo off
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

if errorlevel 0 (
    echo.
    echo ✓ Commit créé avec succès !
    echo.

    rem Lecture de la réponse utilisateur
    set /p push_choice="Voulez-vous pousser vers le repository distant ? (y/n): "
    echo Vous avez entré : '[!push_choice!]'
    pause

    rem On ne garde que la première lettre (trim éventuels espaces)
    set "choice=!push_choice:~0,1!"

    if /i "!choice!"=="y" (
        echo.
        echo Push vers le repository distant...
        git push origin HEAD

        if errorlevel 1 (
            echo ✗ Erreur lors du push. Vérifiez vos permissions et votre connexion.
        ) else (
            echo ✓ Push terminé avec succès !
        )
    ) else (
        echo Commit local uniquement. N'oubliez pas de faire un push plus tard.
    )
) else (
    echo.
    echo ✗ Erreur lors de la création du commit.
    echo Vérifiez qu'il y a des modifications à committer.
)

echo.
echo Retour au repertoire parent...
cd ..

echo.
pause