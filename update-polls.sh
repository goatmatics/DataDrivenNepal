#!/bin/bash

# Hamro Awaz Polling Platform - Auto Update Script
# This script runs the Python script to update polls from markdown to HTML

echo "🔄 Updating polls from markdown to HTML..."

# Check if Python is available
if command -v python3 &> /dev/null; then
    python3 update-polls.py
elif command -v python &> /dev/null; then
    python update-polls.py
else
    echo "❌ Python not found. Please install Python to use this script."
    exit 1
fi

echo "✅ Poll update complete!"
