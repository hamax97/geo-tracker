#!/bin/sh

export PYTHONPATH=.
exec gunicorn --chdir ./tracker -b 0.0.0.0:5000 server:app
