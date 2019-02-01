# Blueprint that contains all the login and registry views

from flask import (
    Blueprint, flash, g, redirect, render_template, request, session, url_for
)

from werkzeug.security import check_password_hash, generate_password_hash
from model.database import get_db

# Create the blueprint
blueprint = Blueprint('auth', __name__, url_prefix = '/')

# View to manage users login
@blueprint.route('/', methods=('GET', 'POST'))
def login():

    if request.method == 'POST':

        user_name = request.form['username']
        password = request.form['password']
        
        database = get_db()
        user = database.execute(
            'SELECT * FROM user WHERE usr_name = ?', (user_name,)
        ).fetchone()
        error = None

        if user is None:
            error = 'Incorrect username/password.'
        elif not check_password_hash(user['usr_password'], password):
            'Incorrect username/password.'

        if error is None:
            # Start a new session
            session.clear()
            session['user_id'] = user['usr_id']
            
            return redirect(url_for('gps.index'))
        
        flash(error)
        
    return render_template('auth/login.html')

# View to manage user registration
@blueprint.route('/register', methods=('GET', 'POST'))
def register():

    if request.method == 'POST':
        
        user_name = request.form['username']
        password = request.form['password']
        repassword = request.form['repassword']
        database = get_db()

        error = None

        if not user_name:
            error = 'Username is required.'
        elif not password:
            error = 'Password is required.'
        elif not repassword:
            error = 'Please type again your password.'
        elif password != repassword:
            error = 'The passwords do not match.'
        elif database.execute(
                'SELECT usr_name FROM user WHERE usr_name = ?', (user_name,)
        ).fetchone() is not None:
            error = 'The username {} is already in use.'.format(user_name)
            
        if error is None:
            database.execute(
                'INSERT INTO user (usr_name, usr_password) VALUES (?, ?)', (user_name, generate_password_hash(password))
            )
            database.commit()
            
            return redirect(url_for('auth.login'))

        flash(error)
            
    return render_template('auth/register.html')

# View to handle logout requests
@blueprint.route('logout')
def logout():
    session.clear()
    return redirect(url_for('auth.login'))

# Called after every request, no matter what                             
@blueprint.before_app_request
def load_logged_in_user():

    user_id = session.get('user_id')
    if user_id is None:
        g.user = None
    else:
        g.user = get_db().execute(
            'SELECT * FROM user WHERE usr_id = ?', (user_id,)
        ).fetchone()
