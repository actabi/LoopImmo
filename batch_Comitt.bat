@echo off
REM ====================================================
REM Script pour mettre à jour et envoyer vos modifications sur origin/main
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

REM 1. Affiche le remote
echo.
echo Remote(s) de ce repo :
git remote -v

REM 2. Affiche le statut avant les modifications
echo.
echo Statut avant les modifications :
git status

REM 3. Ajoute les fichiers modifiés et nouveaux
echo.
echo === git add . ===
git add .

REM 4. Demande un message de commit
set /p COMMIT_MSG="Entrez le message de commit : "

REM Vérifie que le message n'est pas vide
if "%COMMIT_MSG%"=="" (
    echo ERREUR : Le message de commit ne peut pas etre vide.
    pause
    exit /b 1
)

REM 5. Effectue le commit
echo.
echo === git commit -m "%COMMIT_MSG%" ===
git commit -m "%COMMIT_MSG%"

REM 6. Envoie vers origin/main
echo.
echo === git push origin main ===
git push origin main

REM 7. Affiche le statut et les derniers commits
echo.
git status
echo.
echo Derniers commits :
git log --oneline -3

echo.
echo ----------------------------------------
echo Envoi terminé : vos modifications sont sur origin/main.
echo ----------------------------------------

pause
