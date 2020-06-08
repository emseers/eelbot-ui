from flask import (
    request, jsonify
)

def package_response(response_obj):
    response = jsonify(response_obj)
    response.headers.add('Access-Control-Allow-Origin', '*')
    return response