#!/bin/bash

# ===========================================
# QuickMobile Customer Frontend - EC2 Deploy Script
# ===========================================
# Uploads local code to EC2 and rebuilds the frontend
# Usage: ./deploy.sh [COMMAND] [--prod]
# Commands:
#   --upload    Just upload code
#   --deploy    Upload + npm install + build + restart PM2
#   --quick     Upload + build + restart PM2 (fastest)
#   --build     Build only on remote (no upload)
#   --logs      View PM2 logs
#   --status    Check PM2 status
#   --ssh       SSH into EC2

set -e

# ===========================================
# CONFIGURATION
# ===========================================
EC2_HOST="65.1.41.179"
EC2_USER="ubuntu"
EC2_KEY="$HOME/Quickmobile.pem"


# Default Configuration (Staging)
APP_DIR="/home/ubuntu/QuickMobile_Customer"
APP_NAME="quickmobile-customer"
SERVE_PORT="3000"
ENV_NAME="Staging"

# Check for --prod flag
for arg in "$@"; do
    if [ "$arg" == "--prod" ]; then
        APP_DIR="/home/ubuntu/prod_Customer"
        APP_NAME="quickmobile-customer-prod"
        SERVE_PORT="3001"
        ENV_NAME="Production"
        break
    fi
done

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
    log_info "Uploading code to $ENV_NAME ($APP_DIR)..."
    
    SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
    
    # Ensure remote directory exists
    ssh_cmd "mkdir -p $APP_DIR"

    rsync -avz --progress \
        --exclude 'node_modules' \
        --exclude '.git' \
        --exclude 'dist' \
        --exclude '.env' \
        --exclude '.env.production' \
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
    log_info "Building frontend on $ENV_NAME..."
    
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
    
    log_info "Installing dependencies, building, and restarting PM2 for $ENV_NAME..."
    
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
    
    log_success "Full deployment to $ENV_NAME complete!"
}

# ===========================================
# QUICK - Upload + build + restart PM2 (no npm install)
# ===========================================
quick() {
    upload
    
    log_info "Building frontend and restarting PM2 for $ENV_NAME (skipping npm install)..."
    
    ssh_cmd "
        export NVM_DIR=\"\$HOME/.nvm\"
        [ -s \"\$NVM_DIR/nvm.sh\" ] && . \"\$NVM_DIR/nvm.sh\"
        
        cd $APP_DIR
        npm run build
        
        pm2 reload $APP_NAME --update-env
        pm2 status
    "
    
    log_success "Quick deployment to $ENV_NAME complete!"
}

# ===========================================
# LOGS - View PM2 logs
# ===========================================
logs() {
    log_info "Fetching logs for $APP_NAME..."
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
    log_info "Checking status for $APP_NAME..."
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
    log_info "Connecting to EC2..."
    ssh -i $EC2_KEY $EC2_USER@$EC2_HOST
}

# ===========================================
# MAIN
# ===========================================
print_usage() {
    echo ""
    echo "Usage: ./deploy.sh [COMMAND] [--prod]"
    echo ""
    echo "  --upload    Upload code to EC2 (rsync)"
    echo "  --deploy    Upload + npm install + build + restart PM2"
    echo "  --quick     Upload + build + restart PM2 (no npm install)"
    echo "  --build     Build only on remote (no upload)"
    echo "  --logs      View PM2 logs"
    echo "  --status    Check PM2 status"
    echo "  --ssh       SSH into EC2"
    echo ""
    echo "Options:"
    echo "  --prod      Target production environment ($APP_DIR)"
    echo ""
}

# Identify command (first argument that is not --prod)
COMMAND=""
for arg in "$@"; do
    if [ "$arg" != "--prod" ]; then
        COMMAND="$arg"
        break
    fi
done

if [ -z "$COMMAND" ]; then
    print_usage
    exit 1
fi

case "$COMMAND" in
    --upload)  upload ;;
    --deploy)  deploy ;;
    --quick)   quick ;;
    --build)   build ;;
    --logs)    logs ;;
    --status)  status ;;
    --ssh)     connect ;;
    *)         print_usage ;;
esac
