@echo off
REM Create the base backend directory
mkdir backend

REM Create subdirectories
mkdir backend\controllers
mkdir backend\middleware
mkdir backend\models
mkdir backend\routes
mkdir backend\utils

REM Create files in controllers
echo. > backend\controllers\authController.js
echo. > backend\controllers\complaintController.js
echo. > backend\controllers\evidenceController.js
echo. > backend\controllers\firController.js

REM Create files in middleware
echo. > backend\middleware\auth.js
echo. > backend\middleware\roles.js

REM Create files in models
echo. > backend\models\User.js
echo. > backend\models\Complaint.js

REM Create files in routes
echo. > backend\routes\authRoutes.js
echo. > backend\routes\complaintRoutes.js
echo. > backend\routes\evidenceRoutes.js
echo. > backend\routes\firRoutes.js

REM Create files in utils
echo. > backend\utils\ipfsUploader.js
echo. > backend\utils\contract.js

REM Create .env file
echo. > backend\.env

REM Create app.js and server.js
echo. > backend\app.js
echo. > backend\server.js

echo Project structure created successfully!
pause
