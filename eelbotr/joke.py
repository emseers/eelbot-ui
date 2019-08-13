import functools

from flask import (
    Blueprint, flash, g, redirect, request, session, url_for, jsonify, abort
)

from eelbotr.db import get_db, query_db

# this is the joke blueprint, define endpoints for jokes here
bp = Blueprint('joke', __name__, url_prefix='/joke')

# view/endpoint for creating or requesting all jokes
@bp.route('/', methods = ['POST', 'GET'])
def jokes():
    db = get_db()

    if request.method == 'POST':
        #joke_id = request.form['JokeID']
        #check if JokeID autoincrements
        joke = request.form['JokeText']
        opt_punchline = request.form['JokeTextLine2']

        db.execute('INSERT into EelJokes (JokeID, JokeText, JokeTextLine2)'
                    ' VALUES (NULL, ?, ?)', (joke, opt_punchline)
        )
        db.commit()
        return redirect('/')
        
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
    db = get_db()
    db.execute('DELETE FROM EelJokes WHERE JokeID = ?', (id,))
    db.commit()
    return redirect('/')

# view/endpoint for viewing a single or updating a joke
@bp.route('/<int:id>', methods = ['POST', 'GET'])
def update(id):
    db = get_db()
    # updating
    if request.method == 'POST':
        joke = request.form['JokeText']
        opt_punchline = request.form['JokeTextLine2']

        db.execute(
            'UPDATE EelJokes SET JokeText = ?, JokeTextLine2 = ?'
            ' WHERE JokeID = ?',
            (joke, opt_punchline, id)
        )
        db.commit()
        return redirect('/')
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
        abort(404, "Joke id {0} doesn't exist.".format(id))

    return joke
    
    
