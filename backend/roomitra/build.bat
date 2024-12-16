@echo off
echo Building RooMitra application...

REM Clean and package the application
call mvnw.cmd clean package -DskipTests

REM Check if build was successful
if %ERRORLEVEL% EQU 0 (
    echo Build successful! JAR file created at target/deploy/roomitra.jar
    
    REM Create deploy directory if it doesn't exist
    if not exist "target\deploy" mkdir "target\deploy"
    
    REM Copy application.properties to deploy directory
    copy "src\main\resources\application.properties" "target\deploy\"
    
    echo Deployment files ready at target/deploy/
) else (
    echo Build failed!
    exit /b 1
)