#!/bin/bash

# ===========================================
# QuickMobile Customer Frontend - EC2 Deploy Script
# ===========================================
# Uploads local code to EC2 and rebuilds the frontend
# Usage: ./deploy.sh [--upload | --deploy | --quick | --build | --logs | --status]
# ./deploy.sh --upload   Just upload code
# ./deploy.sh --deploy   Upload + npm install + build + restart PM2
# ./deploy.sh --quick    Upload + build + restart PM2 (fastest)
# ./deploy.sh --build    Build only on remote (no upload)
# ./deploy.sh --logs     View PM2 logs
# ./deploy.sh --status   Check PM2 status
# ./deploy.sh --ssh      SSH into EC2

set -e

# ===========================================
# CONFIGURATION - UPDATE THESE
# ===========================================
EC2_HOST="65.1.41.179"                           # Quickmobile EC2
EC2_USER="ubuntu"                                 # Ubuntu user
EC2_KEY="~/.ssh/id_ed25519_movies"               # Your SSH key

APP_DIR="/home/ubuntu/QuickMobile_Customer"       # Remote app directory
APP_NAME="quickmobile-customer"                   # PM2 app name
SERVE_PORT="3000"                                 # Port to serve the frontend

# Colors
GREEN='\033[0;32m'
BLUE='\033[0;34m'
RED='\033[0;31m'
YELLOW='\033[0;33m'
NC='\033[0m'

log_info() { echo -e "${BLUE}[INFO]${NC} $1"; }
log_success() { echo -e "${GREEN}[SUCCESS]${NC} $1"; }
log_error() { echo -e "${RED}[ERROR]${NC} $1"; }
log_warn() { echo -e "${YELLOW}[WARN]${NC} $1"; }

ssh_cmd() {
    ssh -i $EC2_KEY $EC2_USER@$EC2_HOST "$1"
}

# ===========================================
# UPLOAD - Sync local code to EC2
# ===========================================
upload() {
    log_info "Uploading code to EC2..."
    
    SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
    
    rsync -avz --progress \
        --exclude 'node_modules' \
        --exclude '.git' \
        --exclude 'dist' \
        --exclude '.env' \
        --exclude '*.log' \
        --exclude '.DS_Store' \
        --exclude '.vite' \
        -e "ssh -i $EC2_KEY" \
        "$SCRIPT_DIR/" \
        "$EC2_USER@$EC2_HOST:$APP_DIR/"
    
    log_success "Code uploaded to $APP_DIR"
}

# ===========================================
# BUILD - Build the frontend on remote
# ===========================================
build() {
    log_info "Building frontend on remote..."
    
    ssh_cmd "
        export NVM_DIR=\"\$HOME/.nvm\"
        [ -s \"\$NVM_DIR/nvm.sh\" ] && . \"\$NVM_DIR/nvm.sh\"
        
        cd $APP_DIR
        npm run build
    "
    
    log_success "Frontend built successfully!"
}

# ===========================================
# DEPLOY - Upload + npm install + build + restart PM2
# ===========================================
deploy() {
    upload
    
    log_info "Installing dependencies, building, and restarting PM2..."
    
    ssh_cmd "
        set -e # Exit immediately if any command exits with non-zero status
        export NVM_DIR=\"\$HOME/.nvm\"
        [ -s \"\$NVM_DIR/nvm.sh\" ] && . \"\$NVM_DIR/nvm.sh\"
        
        cd $APP_DIR
        npm ci
        npm run build
        
        # Restart or start PM2 with serve
        pm2 restart $APP_NAME || pm2 serve dist $SERVE_PORT --name $APP_NAME --spa
        pm2 save
        pm2 status
    "
    
    log_success "Full deployment complete!"
}

# ===========================================
# QUICK - Upload + build + restart PM2 (no npm install)
# ===========================================
quick() {
    upload
    
    log_info "Building frontend and restarting PM2 (skipping npm install)..."
    
    ssh_cmd "
        export NVM_DIR=\"\$HOME/.nvm\"
        [ -s \"\$NVM_DIR/nvm.sh\" ] && . \"\$NVM_DIR/nvm.sh\"
        
        cd $APP_DIR
        npm run build
        
        pm2 reload $APP_NAME --update-env
        pm2 status
    "
    
    log_success "Quick deployment complete!"
}

# ===========================================
# LOGS - View PM2 logs
# ===========================================
logs() {
    ssh_cmd "
        export NVM_DIR=\"\$HOME/.nvm\"
        [ -s \"\$NVM_DIR/nvm.sh\" ] && . \"\$NVM_DIR/nvm.sh\"
        pm2 logs $APP_NAME --lines 100
    "
}

# ===========================================
# STATUS - Check PM2 status
# ===========================================
status() {
    ssh_cmd "
        export NVM_DIR=\"\$HOME/.nvm\"
        [ -s \"\$NVM_DIR/nvm.sh\" ] && . \"\$NVM_DIR/nvm.sh\"
        pm2 status
    "
}

# ===========================================
# SSH - Connect to EC2
# ===========================================
connect() {
    ssh -i $EC2_KEY $EC2_USER@$EC2_HOST
}

# ===========================================
# MAIN
# ===========================================
print_usage() {
    echo ""
    echo "Usage: ./deploy.sh [OPTION]"
    echo ""
    echo "  --upload    Upload code to EC2 (rsync)"
    echo "  --deploy    Upload + npm install + build + restart PM2"
    echo "  --quick     Upload + build + restart PM2 (no npm install)"
    echo "  --build     Build only on remote (no upload)"
    echo "  --logs      View PM2 logs"
    echo "  --status    Check PM2 status"
    echo "  --ssh       SSH into EC2"
    echo ""
}

case "$1" in
    --upload)  upload ;;
    --deploy)  deploy ;;
    --quick)   quick ;;
    --build)   build ;;
    --logs)    logs ;;
    --status)  status ;;
    --ssh)     connect ;;
    *)         print_usage ;;
esac
