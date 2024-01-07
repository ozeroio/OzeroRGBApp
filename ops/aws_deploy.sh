#!/bin/bash

npm run build-aws
aws s3 rm s3://rgb.ozero.io --recursive --profile aws0:devops
aws s3 cp  --recursive dist/ozero-rgb-app/ s3://rgb.ozero.io --profile aws0:devops
