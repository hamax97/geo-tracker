# Parent image. That is, python3 environment
FROM python:3

# Set working directory
WORKDIR /app

# Copy the flask application into /app
COPY . /app

# Install python3 dependencies
RUN pip install -r requirements.txt

# Make port 5000 available outside container
EXPOSE 5000

# Environment variables
ENV FLASK_APP=tracker
ENV FLASK_ENV=development

# Initialize database
RUN flask init-db

# Start app
CMD ["gunicorn", "-b 0.0.0.0:5000", ".:tracker"]