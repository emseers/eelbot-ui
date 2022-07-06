from flask_sqlalchemy import SQLAlchemy


db = SQLAlchemy()

class EelJokes(db.Model):
    __tablename__ = 'jokes'
    id = db.Column(db.Integer, primary_key=True, default=db.text("(SELECT MAX(id) + 1 FROM jokes)"))
    text = db.Column(db.Text, nullable=False)
    punchline = db.Column(db.Text, nullable=True)

    def get_joke_data(self):
        return {"JokeID": self.id, "JokeText": self.text, "JokeTextLine2": self.punchline}