# Blueprint that contains all the gps views

from flask import (
    Blueprint, flash, g, redirect, render_template, request, session, url_for
)

from views.auth import login_required
from model.database import get_db

blueprint = Blueprint('gps', __name__, url_prefix = '/gps')

@blueprint.route('/')
@login_required
def index():
    return render_template('gps/index.html')

@blueprint.route('/db/route/<username>', methods=['GET', 'POST'])
@login_required
def route(username):

    database = get_db()
    # Obatin user id
    usr_id = database.execute(
        'SELECT usr_id FROM user WHERE usr_name = ?', (username,)
    ).fetchone()['usr_id']

    if request.method == 'POST':
        print(username + str(request.data))

        points = request.data
        # Insert route points and associate it with usr_id
        database.execute(
            'INSERT INTO route (points, usr_id) VALUES (?, ?)', (str(points), str(usr_id))
        )
        database.commit()
        return ('', 204)
    
    routes = database.execute(
            'SELECT points FROM route WHERE usr_id = ?', (str(usr_id),)
    ).fetchall()

    routes_arr = []
    
    i = 0
    for route in routes:
        
        without_b = route['points'].replace('b', '')
        without_quotes = without_b.replace('\'', '')

        if i != len(routes) - 1:
            without_quotes += ';'

        routes_arr.append(without_quotes)
        print(without_quotes)
        i += 1
    
    return str(routes_arr)



