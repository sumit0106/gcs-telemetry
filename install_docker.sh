#!/bin/bash

# Update system packages
sudo apt update -y
sudo apt upgrade -y

# Install prerequisite packages
sudo apt install -y \
    ca-certificates \
    curl \
    gnupg \
    lsb-release \
    git \
    apt-transport-https \
    software-properties-common

# Install Docker
sudo mkdir -p /etc/apt/keyrings
curl -fsSL https://download.docker.com/linux/ubuntu/gpg | \
  sudo gpg --dearmor -o /etc/apt/keyrings/docker.gpg

echo \
  "deb [arch=$(dpkg --print-architecture) signed-by=/etc/apt/keyrings/docker.gpg] \
  https://download.docker.com/linux/ubuntu $(lsb_release -cs) stable" | \
  sudo tee /etc/apt/sources.list.d/docker.list > /dev/null

sudo apt update -y
sudo apt install -y docker-ce docker-ce-cli containerd.io

# Enable Docker service
sudo systemctl enable docker
sudo systemctl start docker

# Install Docker Compose v2.24.0
sudo curl -L "https://github.com/docker/compose/releases/download/v2.24.0/docker-compose-$(uname -s)-$(uname -m)" \
  -o /usr/local/bin/docker-compose
sudo chmod +x /usr/local/bin/docker-compose

# Install Node.js (LTS)
curl -fsSL https://deb.nodesource.com/setup_lts.x | sudo -E bash -
sudo apt install -y nodejs

# Verify installations
docker --version
docker-compose --version
git --version
node --version
npm --version
