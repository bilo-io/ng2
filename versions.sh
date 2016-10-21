#!/bin/bash
clear
echo "=============================="
echo "VERSIONS: "
echo "------------------------------"

echo "Node:"
node -v
echo "------------"

echo "NPM:"
npm -v
echo "------------"

echo "JSPM:"
jspm -v
echo "------------"

echo "Gulp:"
gulp -v
echo "------------"

# echo "Typescript:"
# typescript -v
# echo "------------"

echo "TSC:"
tsc -v
echo "------------"

echo "Typings:"
typings -v
echo "------------------------------"