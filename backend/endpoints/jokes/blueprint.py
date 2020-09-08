from flask import Blueprint, make_response

bp = Blueprint(
    "eelbot_joke",
    __name__,
    url_prefix="/joke",
)

@bp.route("/")
def main():
    return make_response(("Hello Eels!", 200))