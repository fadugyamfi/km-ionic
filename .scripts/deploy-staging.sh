#!/bin/bash

export NVM_DIR="$HOME/.nvm"
[ -s "$NVM_DIR/nvm.sh" ] && \. "$NVM_DIR/nvm.sh"  # This loads nvm
[ -s "$NVM_DIR/bash_completion" ] && \. "$NVM_DIR/bash_completion"  # This loads nvm bash_completion

set -e

echo "Deployment started ..."

git restore package-lock.json
git pull
npm install -g @ionic/cli
npm install
npm run build --prod

# cp ../public/manifest.webmanifest ../dist/manifest.webmanifest
# TODO: Make the following line server agnostic
cp /var/www/m-dev.kola.market/public/manifest.webmanifest /var/www/m-dev.kola.market/dist/manifest.webmanifest

echo "Deployment finished!"
