#!/bin/bash

## NPM
# npm install karma --save-dev
# npm install karma-jasmine karma-chrome-launcher --save-dev
# npm install -g karma-cli

## JSPM
jpsm install npm:karma
jspm install npm:karma-jasmine
jspm install npm:karma-chrome-launcher
npm install -g karma-cli