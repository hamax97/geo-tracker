# geo-tracker
Responsive web application that uses GPS to track and share routes between users.

## Requirements

* docker
* Docker service running

## Instructions

### Deploy on Docker

0. In case of permission errors:
   ``` $ sudo usermod -aG docker $USER ```
   Log out and then log in again.

1. Go into project directory:
   ``` $ cd geo-tracker ```

2. Build the environment:
   ``` $ docker build --tag=geotrackerwebapp . ```

3. 

### Deploy on a virtual environment

$ gunicorn --chdir ./tracker -b 0.0.0.0:5000 server:app
$ gunicorn --certfile ssl/cert.pem --keyfile ssl/keyfile.pem --chdir ./tracker -b 0.0.0.0:5000 server:app