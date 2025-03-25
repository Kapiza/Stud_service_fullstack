@echo off
cd /d "."
start cmd /k "npm run dev"

cd /d ".\frontend"
start cmd /k "npm start"