@echo off
echo Starting RooMitra application...

REM Check if JAR exists
if not exist "target\deploy\roomitra.jar" (
    echo Error: roomitra.jar not found! Please run build.bat first.
    exit /b 1
)

REM Run the application
java -jar target/deploy/roomitra.jar