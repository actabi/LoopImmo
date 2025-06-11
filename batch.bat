@echo off
REM Nettoyage complet et synchronisation du repo avec origin/main

echo === Nettoyage des fichiers non suivis et ignorés ===
git clean -fdx

echo === Récupération des dernières modifications du remote ===
git fetch origin

echo === Reset hard sur origin/main ===
git reset --hard origin/main

echo === Diff avec origin/main ===
git diff origin/main

echo === Status final ===
git status

pause
