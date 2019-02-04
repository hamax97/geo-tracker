# Parent image. That is, python3 environment
FROM python:3

# Set working directory
WORKDIR /geo-tracker

# Copy the flask application into /geo-tracker
COPY . /geo-tracker

# Install python3 dependencies
RUN pip install -r requirements.txt

# Entrypoin
ENTRYPOINT ["./run.sh"]