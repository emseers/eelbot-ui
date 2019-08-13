import functools

from flask import (
    Blueprint, flash, g, request, session, url_for, jsonify, abort
)

from backend.db import get_db, query_db

# this is the joke blueprint, define endpoints for jokes here
bp = Blueprint('joke', __name__, url_prefix='/joke')

# view/endpoint for creating or requesting all jokes
@bp.route('/', methods = ['POST', 'GET'])
def jokes():
    db = get_db()

    if request.method == 'POST':
        joke_id = None
        if 'JokeID' in request.json:
            joke_id = request.json['JokeID']
            joke = query_db('select * from EelJokes where JokeID = ?', [joke_id], one=True)
            if joke:
                return jsonify(success=False)
        joke_text = request.json['JokeText']
        opt_punchline = request.json['JokeTextLine2']

        db.execute('INSERT into EelJokes (JokeID, JokeText, JokeTextLine2)'
                    ' VALUES (?, ?, ?)', (joke_id, joke_text, opt_punchline)
        )
        db.commit()
        return jsonify(success=True)
        
    all_jokes = {}
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
    joke = query_db('select * from EelJokes where JokeID = ?', [id], one=True)
    if not joke:
         abort(404)

    db = get_db()
    db.execute('DELETE FROM EelJokes WHERE JokeID = ?', (id,))
    db.commit()
    return jsonify(success=True)

# view/endpoint for viewing a single or updating a joke
@bp.route('/<int:id>', methods = ['POST', 'GET'])
def update(id):
    db = get_db()
    # updating
    if request.method == 'POST':
        joke = request.json['JokeText']
        opt_punchline = request.json['JokeTextLine2']

        db.execute(
            'UPDATE EelJokes SET JokeText = ?, JokeTextLine2 = ?'
            ' WHERE JokeID = ?',
            (joke, opt_punchline, id)
        )
        db.commit()
        return jsonify(success=True)
    #viewing
    joke = get_joke(id)

    joke_obj = {'JokeID' : None, 'JokeText' : None, 'JokeTextLine2' : None}
    joke_obj['JokeID'] = joke['JokeID']
    joke_obj['JokeText'] = joke['JokeText']
    joke_obj['JokeTextLine2'] = joke['JokeTextLine2']
    return jsonify(joke_obj)

    
def get_joke(id):
    joke = query_db('select * from EelJokes where JokeID = ?',
    [id], one=True)

    if joke is None:
        return abort(404)

    return joke
    
    
