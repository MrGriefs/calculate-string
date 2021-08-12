#!/bin/sh

. ~/.nvm/nvm.sh

echo "Building with webpack"
if ! errmsg=$(nvm exec 16 npm run build 1>&2); then exit 1; fi

echo "Test on latest node version"
if ! errmsg=$(nvm exec 16 node tests 1>&2); then exit 1; fi

exit 0