#!/bin/bash

npm run build
#
#PACKAGE_VERSION=$(cat package.json \
#  | grep version \
#  | head -1 \
#  | awk -F: '{ print $2 }' \
#  | sed 's/[" ,]//g')
#
#echo "Deploying version $PACKAGE_VERSION"
#
#sed -i "s/src=\"/src=\"$PACKAGE_VERSION\//g" dist/ozero-rgb-app/index.html
#
#mkdir -p  "dist/$PACKAGE_VERSION"
#
#mv dist/ozero-rgb-app/* "dist/$PACKAGE_VERSION"
#
#mv "dist/$PACKAGE_VERSION" dist/ozero-rgb-app/

scp -pr dist/ozero-rgb-app/* pi@10.0.0.9:/var/www/html/

