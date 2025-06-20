@echo off
echo ========================================
echo    REMPLACEMENT COMPLET DU PROJET
echo ========================================
echo.
echo ATTENTION: Cette operation va SUPPRIMER completement
echo le dossier LoopImmo existant et le remplacer par
echo une version fraiche du repository Git.
echo.
echo TOUTES LES MODIFICATIONS NON COMMITEES SERONT PERDUES !
echo.

set /p confirm="Etes-vous sur de vouloir continuer ? (oui/non): "

if /i not "%confirm%"=="oui" (
    echo Operation annulee.
    pause
    exit /b 0
)

echo.
echo ========================================
echo     SUPPRESSION DU DOSSIER EXISTANT
echo ========================================

if exist "LoopImmo" (
    echo Suppression du dossier LoopImmo...
    rmdir /s /q "LoopImmo"
    
    if exist "LoopImmo" (
        echo ERREUR: Impossible de supprimer le dossier LoopImmo.
        echo Verifiez qu'aucun fichier n'est en cours d'utilisation.
        pause
        exit /b 1
    )
    
    echo ✓ Dossier supprime avec succes.
) else (
    echo Le dossier LoopImmo n'existe pas, pas besoin de le supprimer.
)

echo.
echo ========================================
echo      CLONAGE DU REPOSITORY FRAIS
echo ========================================

echo Clonage du repository depuis GitHub...
git clone https://github.com/actabi/LoopImmo.git

if %errorlevel% equ 0 (
    echo.
    echo ✓ Clonage termine avec succes !
    echo.
    echo Le projet LoopImmo a ete completement reinstalle.
    echo Tous les fichiers sont maintenant synchronises avec la version Git.
) else (
    echo.
    echo ✗ Erreur lors du clonage du repository.
    echo Verifiez votre connexion internet et l'URL du repository.
)

echo.
pause