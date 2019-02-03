# Parent image. That is, python3 environment
FROM python:3

# Set working directory
WORKDIR /geo-tracker

# Copy the flask application into /geo-tracker
COPY . /geo-tracker

# Install python3 dependencies
RUN pip install -r requirements.txt

# Make port 5000 available outside container
EXPOSE 5000

# Entrypoin
ENTRYPOINT ["./run.sh"]