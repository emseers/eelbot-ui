from flask_sqlalchemy import SQLAlchemy


db = SQLAlchemy()

class EelJokes(db.Model):
    __tablename__ = 'EelJokes'
    JokeID = db.Column(db.Integer, primary_key=True)
    JokeText = db.Column(db.Text, nullable=False)
    JokeTextLine2 = db.Column(db.Text, nullable=True)

    def get_joke_data(self):
        joke_data = {"JokeID": self.JokeID, "JokeText": self.JokeText, "JokeTextLine2": self.JokeTextLine2}
        return joke_data
