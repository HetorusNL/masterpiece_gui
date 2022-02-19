#!/bin/bash
set -e

echo "starting deployment of masterpiece dashboard"

echo ""
echo "removing existing content from folder"
echo "sudo rm -r /data/caddy-data/masterpiece.hetorus.nl/*"
sudo rm -rf /data/caddy-data/masterpiece.hetorus.nl/*

echo ""
echo "copying build masterpiece dashboard to the server root"
echo "cp -r build/* /data/caddy-data/masterpiece.hetorus.nl/"
cp -r build/* /data/caddy-data/masterpiece.hetorus.nl/

echo ""
echo "finished deployment of masterpiece dashboard!"
