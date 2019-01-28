# Blueprint that contains all the gps views

from flask import (
    Blueprint, flash, g, redirect, render_template, request, session, url_for
)

blueprint = Blueprint('gps', __name__, url_prefix = '/gps')

@blueprint.route('/')
def index():
    return render_template('gps/index.html')
