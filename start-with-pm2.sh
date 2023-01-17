#!/bin/bash
chmod +x backend/start-backend-pm2.sh &&
chmod +x frontend/start-frontend-pm2.sh &&
npm install pm2 -g &&
cd backend &&
pm2 start start-backend-pm2.sh &&
cd ../frontend &&
pm2 start start-frontend-pm2.sh
