#!/bin/sh

export FLASK_APP=tracker
export FLASK_ENV=development


if [ "$1" = "run" ];
then    
   flask run
elif [ "$1" = "init-db" ];
then
    flask init-db
fi


