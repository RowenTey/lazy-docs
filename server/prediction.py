import os
import sys
sys.path.insert(0, os.path.abspath(os.path.join(os.path.dirname(__file__), '..')))
from tkinter import N
from urllib import request
from flask import Blueprint
from flask import request
from model.lib.agent import OpenAIAgent
from flask_cors import cross_origin, CORS

bp = Blueprint("prediction", __name__, url_prefix="/prediction")

CORS(bp)

@bp.route("/upload", methods=["POST"])
@cross_origin()
def upload():
    file = None
    try:
        file = request.files["file"]
        file.save("./data/upload.pdf")
    except:
        return "Error in file", 400
    print(file)
    return {"status": "success"}


@bp.route("/predict", methods=["POST"])
@cross_origin()
def predict():
    file_path = None
    try:
        file_path = request.get_json()
    except:
        return "Error in body", 400
    
    # return "Remove this", 200

    if file_path:
        agent = OpenAIAgent(filename="test1.pdf")
        agent.get_content()
        agent.get_page_by_page_summary()
        print(agent.get_overall_summary())

    # x = np.array([sepal_length, sepal_width, petal_length, petal_width], ndmin=2)

    # prediction = classifier.predict(x)

    # if prediction is None:
    #     return "Something went wrong", 400

    return {"status": "success"}
