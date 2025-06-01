@echo off
echo Creating Candidate Assessment Dashboard project structure...
echo.

REM Create main directories
if not exist "assets" mkdir "assets"
if not exist "data" mkdir "data"
if not exist "docs" mkdir "docs"
if not exist "scripts" mkdir "scripts"
if not exist "tests" mkdir "tests"

REM Create subdirectories
if not exist "assets\css" mkdir "assets\css"
if not exist "assets\js" mkdir "assets\js"
if not exist "assets\images" mkdir "assets\images"
if not exist "assets\fonts" mkdir "assets\fonts"

if not exist "docs\screenshots" mkdir "docs\screenshots"

if not exist "tests\unit" mkdir "tests\unit"
if not exist "tests\integration" mkdir "tests\integration"

echo ✅ Created main directories:
echo    - assets/
echo    - data/
echo    - docs/
echo    - scripts/
echo    - tests/
echo.

echo ✅ Created subdirectories:
echo    - assets/css/
echo    - assets/js/
echo    - assets/images/
echo    - assets/fonts/
echo    - docs/screenshots/
echo    - tests/unit/
echo    - tests/integration/
echo.

REM Create basic files
echo Creating basic project files...

REM Create .gitignore
echo # Dependencies > .gitignore
echo node_modules/ >> .gitignore
echo npm-debug.log* >> .gitignore
echo. >> .gitignore
echo # Environment variables >> .gitignore
echo .env >> .gitignore
echo .env.local >> .gitignore
echo .env.development.local >> .gitignore
echo .env.test.local >> .gitignore
echo .env.production.local >> .gitignore
echo. >> .gitignore
echo # Logs >> .gitignore
echo logs >> .gitignore
echo *.log >> .gitignore
echo. >> .gitignore
echo # Runtime data >> .gitignore
echo pids >> .gitignore
echo *.pid >> .gitignore
echo *.seed >> .gitignore
echo *.pid.lock >> .gitignore
echo. >> .gitignore
echo # Coverage directory used by tools like istanbul >> .gitignore
echo coverage/ >> .gitignore
echo. >> .gitignore
echo # IDE files >> .gitignore
echo .vscode/ >> .gitignore
echo .idea/ >> .gitignore
echo *.swp >> .gitignore
echo *.swo >> .gitignore
echo. >> .gitignore
echo # OS generated files >> .gitignore
echo .DS_Store >> .gitignore
echo .DS_Store? >> .gitignore
echo ._* >> .gitignore
echo .Spotlight-V100 >> .gitignore
echo .Trashes >> .gitignore
echo ehthumbs.db >> .gitignore
echo Thumbs.db >> .gitignore

REM Create LICENSE file
echo MIT License > LICENSE
echo. >> LICENSE
echo Copyright (c) 2025 Your Name >> LICENSE
echo. >> LICENSE
echo Permission is hereby granted, free of charge, to any person obtaining a copy >> LICENSE
echo of this software and associated documentation files (the "Software"), to deal >> LICENSE
echo in the Software without restriction, including without limitation the rights >> LICENSE
echo to use, copy, modify, merge, publish, distribute, sublicense, and/or sell >> LICENSE
echo copies of the Software, and to permit persons to whom the Software is >> LICENSE
echo furnished to do so, subject to the following conditions: >> LICENSE
echo. >> LICENSE
echo The above copyright notice and this permission notice shall be included in all >> LICENSE
echo copies or substantial portions of the Software. >> LICENSE
echo. >> LICENSE
echo THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR >> LICENSE
echo IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, >> LICENSE
echo FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE >> LICENSE
echo AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER >> LICENSE
echo LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, >> LICENSE
echo OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE >> LICENSE
echo SOFTWARE. >> LICENSE

REM Create placeholder files
echo /* Main stylesheet for the dashboard */ > "assets\css\styles.css"
echo console.log('Dashboard loading...'); > "assets\js\dashboard.js"
echo // Data management functions > "assets\js\data.js"

echo. > "data\candidates.json"
echo. > "data\interviews.json"

echo # Setup Instructions > "docs\setup.md"
echo This file contains setup instructions for the project. >> "docs\setup.md"

echo ✅ Created project files:
echo    - .gitignore
echo    - LICENSE
echo    - assets/css/styles.css
echo    - assets/js/dashboard.js
echo    - assets/js/data.js
echo    - data/candidates.json
echo    - data/interviews.json
echo    - docs/setup.md
echo.

echo 📁 Project structure created successfully!
echo.
echo Next steps:
echo 1. Copy your HTML, CSS, and JS files to their respective folders
echo 2. Initialize git: git init
echo 3. Add files: git add .
echo 4. Commit: git commit -m "Initial commit"
echo 5. Add remote: git remote add origin [your-repo-url]
echo 6. Push: git push -u origin main
echo.
echo Happy coding! 🚀

pause