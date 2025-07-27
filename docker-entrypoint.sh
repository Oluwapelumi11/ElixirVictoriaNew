#!/bin/sh

# Function to handle shutdown gracefully
cleanup() {
    echo "Shutting down services..."
    kill $FRONTEND_PID $BACKEND_PID 2>/dev/null
    exit 0
}

# Set up signal handlers
trap cleanup SIGTERM SIGINT

# Start backend server
echo "Starting backend server on port 5000..."
cd /app/backend
node server.js &
BACKEND_PID=$!

# Wait a moment for backend to start
sleep 2

# Start frontend server
echo "Starting frontend server on port 3000..."
cd /app
node server.js &
FRONTEND_PID=$!

# Wait for both processes
wait $FRONTEND_PID $BACKEND_PID 