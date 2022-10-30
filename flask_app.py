from flask import Flask, render_template, request, Response
from werkzeug.utils import secure_filename
from flask_sqlalchemy import SQLAlchemy

from models import Img
from models import User

app = Flask(__name__)

# db = SQLAlchemy(app)





def to_dict(self):
        return {

            'label': self.label,
            'image_cat_1': self.image_cat_1,
            'image_cat_2': self.image_cat_2,
            'value': self.value,

        }


# db.create_all()

@app.route('/')
def home():
    return render_template('index.html')

@app.route('/')
def index():
    return render_template('ajax_table.html')


@app.route('/api/data')
def data():
    return {'data': [user.to_dict() for user in User.query]}


if __name__ == '__main__':
    app.run()

def upload():
    pic = request.files['pic']
    if not pic:
        return 'No pic uploaded!', 400

    filename = secure_filename(pic.filename)
    mimetype = pic.mimetype
    if not filename or not mimetype:
        return 'Bad upload!', 400

    img = Img(img=pic.read(), name=filename, mimetype=mimetype)
    db.session.add(img)
    db.session.commit()

    return 'Img Uploaded!', 200


@app.route('/<int:id>')
def get_img(id):
    img = Img.query.filter_by(id=id).first()
    if not img:
        return 'Img Not Found!', 404

    return Response(img.img, mimetype=img.mimetype)
