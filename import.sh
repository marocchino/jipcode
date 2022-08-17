#!/bin/bash

set -exo pipefail

# list all csvs in the jipcode/zipcode directory recursively
cp jipcode/zipcode/current_month zipcode/current_month
# convert csv to json
find jipcode/zipcode -name "*.csv" \
  -exec sh -c "jq -Rn '[inputs | split(\",\")]' {} > {}.json" \;

mv jipcode/zipcode/latest/*.json zipcode/latest/.
