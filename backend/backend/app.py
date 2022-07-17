from flask import Flask
from flask_cors import CORS
from abc import abstractmethod
from backend.utils.eeljokes import db
from backend.endpoints import jokes_bp

from configmodule import Config, DevelopmentConfig, ProductionConfig

import waitress

class App:
    app = None

    def __init__(self):
        self.app = Flask(__name__)

    @abstractmethod
    def configure_app(self):
        CORS(self.app)

    def register_app(self):
        self.app.register_blueprint(jokes_bp)

    @abstractmethod
    def serve(self):
        raise NotImplementedError

class DevApp(App):
    def __init__(self):
        super().__init__()
        self.configure_app()
        self.register_app()
        db.init_app(self.app)

    def configure_app(self):
        super().configure_app()
        self.app.config.from_object('configmodule.DevelopmentConfig')

    def serve(self):
        self.app.run(host=self.app.config['HOST'], port=self.app.config['PORT'])

class ProdApp(App):

    def __init__(self):
        super().__init__()
        self.configure_app()
        self.register_app()
        db.init_app(self.app)

    def configure_app(self):
        super().configure_app()
        self.app.config.from_object('configmodule.ProductionConfig')

    def serve(self):
        waitress.serve(self.app, host=self.app.config['HOST'], port=self.app.config['PORT'])
