import os

from flask import Flask

def create_app(test_config = None):

    # Create and configure the app
    
    app = Flask(__name__, instance_relative_config = True)
    # - Default config
    app.config.from_mapping(
        SECRET_KEY = 'dev',
        DATABASE = os.path.join(app.instance_path, 'flask.sqlite')
    )

    if test_config is None:
        # - If there is a configuration file in the instace folder, use it
        app.config.from_pyfile('config.py', silent = True)
    else:
        app.config.from_mapping(test_config)

    # Make sure that the instnace path exists
    try:
        os.makedirs(app.instance_path)
    except OSError:
        pass

    # Database Stuff
    from . import database
    database.init_app(app)

    # Blueprints
    from . import auth
    app.register_blueprint(auth.blueprint)

    from . import gps
    app.register_blueprint(gps.blueprint)

    return app
