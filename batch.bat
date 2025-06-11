@echo off
REM =========================================
REM Synchronisation FORCÉE du repo avec origin/main
REM Tous les changements locaux seront PERDUS.
REM =========================================

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

REM 2. Récupère TOUS les changements distants (commits, nouveaux fichiers...)
echo.
echo === git fetch origin ===
git fetch origin

REM 3. Se place sur la branche main (si elle existe)
echo.
git checkout main

REM 4. Synchronise la branche locale AVEC la branche distante (origin/main)
echo.
echo === git reset --hard origin/main ===
git reset --hard origin/main

REM 5. Nettoie tous les fichiers non trackés et ignorés
echo.
echo === git clean -fdx ===
git clean -fdx

REM 6. Affiche les derniers commits locaux ET distants
echo.
echo Derniers commits locaux :
git log --oneline -3

echo.
echo Derniers commits distants (origin/main) :
git log origin/main --oneline -3

REM 7. Affiche le statut et les fichiers présents
echo.
git status
echo.
git ls-files

echo.
echo ----------------------------------------
echo  Synchronisation complete ! Ce dossier est 100%% ISO avec origin/main
echo ----------------------------------------

pause
