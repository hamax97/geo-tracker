# Blueprint that contains all the gps views

from flask import (
    Blueprint, flash, g, redirect, render_template, request, session, url_for
)

from views.auth import login_required
#from views import auth

blueprint = Blueprint('gps', __name__, url_prefix = '/gps')

@blueprint.route('/')
@login_required
def index():
    return render_template('gps/index.html')
