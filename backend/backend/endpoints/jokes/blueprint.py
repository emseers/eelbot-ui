from flask import Blueprint, make_response, request
from backend.utils.eeljokes import EelJokes, db
import json
import math

bp = Blueprint(
    "eelbot_joke",
    __name__,
    url_prefix="/joke",
)

@bp.route("/", methods=['POST'])
def create_joke():
    json_data = request.json
    new_joke = EelJokes(JokeText=json_data[0], JokeTextLine2=json_data[1])

    try:
        db.session.add(new_joke)
        db.session.commit()
        return "Joke added successfully"
    except:
        return "There was an issue adding your joke"

@bp.route("/", methods=['GET'])
def get_jokes():
    num_jokes_per_page = int(request.args.get('num_jokes_per_page'))
    page = int(request.args.get('page'))

    offset = (page - 1) * num_jokes_per_page
    tasks = EelJokes.query.order_by(EelJokes.JokeID).limit(num_jokes_per_page).offset(offset)
    return_jokes = []
    for task in tasks:
        return_jokes.append(task.get_joke_data())
    return json.dumps(return_jokes)

@bp.route("/page/", methods=['GET'])
def pagenum():
    num_jokes_per_page = int(request.args.get('num_jokes_per_page'))

    rows = EelJokes.query.count()
    num_pages = math.ceil(rows/num_jokes_per_page)
    return str(num_pages)

@bp.route("/<int:id>", methods=['GET'])
def get_joke(id):
    joke_to_return = EelJokes.query.get_or_404(id)
    return json.dumps(joke_to_return.get_joke_data())

@bp.route("/<int:id>", methods=['PUT'])
def update_joke(id):
    joke_to_update = EelJokes.query.get_or_404(id)
    json_data = request.json
    joke_to_update.JokeText = json_data[0]
    joke_to_update.JokeTextLine2 = json_data[1]

    try:
        db.session.commit()
        return json.dumps(joke_to_update.get_joke_data())
    except:
        return "There was an issue updating your joke"

@bp.route("/<int:id>", methods=['DELETE'])
def delete_joke(id):
    joke_to_delete = EelJokes.query.get_or_404(id)

    try:
        db.session.delete(joke_to_delete)
        db.session.commit()
        return "Joke deleted successfully"
    except:
        return "There was a problem deleting that joke"
