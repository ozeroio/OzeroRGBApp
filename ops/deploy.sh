#!/bin/bash

npm run build

scp -r dist/ozero-rgb-app/* pi@10.0.0.9:/var/www/html

