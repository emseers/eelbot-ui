import functools

from flask import (
    Blueprint, flash, g, redirect, request, session, url_for, jsonify
)

from eelbotr.db import get_db, query_db

# this is the joke blueprint, define endpoints for jokes here
bp = Blueprint('joke', __name__, url_prefix='/joke')

# view/endpoint for requesting all jokes
@bp.route('/')
def jokes():
    all_jokes = {}
    db = get_db()
    for joke in query_db('select * from EelJokes'):
        joke_obj = {'JokeID' : None, 'JokeText' : None, 'JokeTextLine2' : None}
        joke_obj['JokeID'] = joke['JokeID']
        joke_obj['JokeText'] = joke['JokeText']
        joke_obj['JokeTextLine2'] = joke['JokeTextLine2']

        all_jokes[joke['JokeID']] = joke_obj

    return jsonify(all_jokes)

# view/endpoint for deleting a joke
@bp.route('/delete/<int:id>')
def delete(id):
    db = get_db()
    db.execute('DELETE FROM EelJokes WHERE JokeID = ?', (id,))
    db.commit()
    return redirect('/')
