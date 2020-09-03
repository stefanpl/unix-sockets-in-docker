#!/bin/bash
set -eo pipefail

scriptDir="$( cd "$( dirname "${BASH_SOURCE[0]}" )" >/dev/null 2>&1 && pwd )"

cd ${scriptDir}

#
# IMPORTANT
#
# For some mysterious reason, the webserver needs to be re-started by itself 
# to make the sockets work.
#
docker-compose up -d --force-recreate \
&& docker-compose up -d --force-recreate webserver \
&& curl localhost:1337 \
&& curl localhost:1337/another
