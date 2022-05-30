from flask import Flask
from flask_cors import CORS
from abc import abstractmethod
from backend.utils.eeljokes import db
from backend.endpoints import jokes_bp
import waitress

class App:
    app = None

    def __init__(self):
        self.app = Flask(__name__)
        self.app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///EelbotDB.db'
        db.init_app(self.app)

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

    def configure_app(self):
        super().configure_app()
        self.host = "0.0.0.0" # TODO: Replace with reading from config
        self.port = "1337" # TODO: Replace with reading from config

    def serve(self):
        self.app.run(host=self.host, port=self.port)

class ProdApp(App):

    def __init__(self):
        super().__init__()
        self.configure_app()
        self.register_app()

    def configure_app(self):
        super().configure_app()
        self.host = "0.0.0.0" # TODO: Replace with reading from config
        self.port = "1338" # TODO: Replace with reading from config

    def serve(self):
        waitress.serve(self.app, host=self.host, port=self.port)
