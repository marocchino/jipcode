#!/bin/bash

set -exo pipefail

read -e -r -p "Dump to latest directory? [y/N]" RESP
VERSION=$(grep VERSION jipcode/lib/jipcode/version.rb | cut -d "'" -f2)
mkdir -p "$VERSION"
# list all csvs in the jipcode/zipcode directory recursively
cp jipcode/zipcode/current_month "$VERSION"/current_month
# convert csv to json
find jipcode/zipcode -name "*.csv" \
  -exec sh -c "jq -Rn '[inputs | split(\",\")]' {} > {}.json" \;

mv jipcode/zipcode/latest/*.json "$VERSION/."

# dump version directory to latest directory
# diaglogs are not included in the latest directory
if [[ "$RESP" =~ ^([yY][eE][sS]|[yY])+$ ]]; then
  rm -rf latest
  cp -r "$VERSION" latest
fi
