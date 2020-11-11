from flask import Blueprint, make_response, request
from utils.myclass import EelJokes, db
import json

bp = Blueprint(
    "eelbot_joke",
    __name__,
    url_prefix="/joke",
)

# @bp.route("/")
# def main():
#     return make_response(("Hello Eels!", 200))

@bp.route("/", methods=['POST'])
def create():
    json_data = request.json
    new_task = EelJokes(JokeText=json_data[0], JokeTextLine2=json_data[1])

    try:
        db.session.add(new_task)
        db.session.commit()
        return "Joke added successfully"
    except:
        return "There was an issue adding your joke"
    pass

@bp.route("/<int:num_jokes_per_page>/page/", methods=['GET'])
def pagenum(num_jokes_per_page):
    import math
    rows = EelJokes.query.count()
    num_pages = math.ceil(rows/num_jokes_per_page)
    return str(num_pages)

@bp.route("/<int:num_jokes_per_page>/page/<int:page>", methods=['GET'])
def readpage(num_jokes_per_page, page):
    offset = (page-1) * num_jokes_per_page
    tasks = EelJokes.query.order_by(EelJokes.JokeID).limit(num_jokes_per_page).offset(offset)
    return_jokes = []
    for task in tasks:
        return_jokes.append(task.get_joke_data())
    return json.dumps(return_jokes)

@bp.route("/<int:id>", methods=['GET', 'PUT', 'DELETE'])
def modify(id):
    if request.method == 'GET':
        joke_to_return = EelJokes.query.get_or_404(id)
        return json.dumps(joke_to_return.get_joke_data())
    elif request.method == 'PUT':
        joke_to_update = EelJokes.query.get_or_404(id)
        json_data = request.json
        joke_to_update.JokeText = json_data[0]
        joke_to_update.JokeTextLine2 = json_data[1]

        try:
            db.session.commit()
            return "Joke updated successfully"
        except:
            return "There was an issue updating your joke"
    else:
        joke_to_delete = EelJokes.query.get_or_404(id)

        try:
            db.session.delete(joke_to_delete)
            db.session.commit()
            return "Joke deleted successfully"
        except:
            return "There was a problem deleting that joke"