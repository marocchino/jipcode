#!/bin/bash

set -exo pipefail

mkdir -p latest
# list all csvs in the jipcode/zipcode directory recursively
cp jipcode/zipcode/current_month latest/current_month
# convert csv to json
find jipcode/zipcode -name "*.csv" \
  -exec sh -c "jq -Rn '[inputs | split(\",\")]' {} > {}.json" \;

mv jipcode/zipcode/latest/*.json latest/.
