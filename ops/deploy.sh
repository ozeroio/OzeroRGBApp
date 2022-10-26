#!/bin/bash

npm run build

scp -r dist/rgbwindow-app/* pi@10.0.0.9:/var/www/html

