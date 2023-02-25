from tkinter import N
from urllib import request
from flask import Blueprint
from flask import request
from model.main import get_ppt_from_upload
from flask_cors import cross_origin, CORS
import os
import sys
sys.path.insert(0, os.path.abspath(
    os.path.join(os.path.dirname(__file__), '..')))

bp = Blueprint("prediction", __name__, url_prefix="/prediction")

CORS(bp)


@bp.route("/upload", methods=["POST"])
@cross_origin()
def upload():
    file = None
    try:
        file = request.files["file"]
        file.save("../data/upload.pdf")
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

    if not file_path:
        return "Something went wrong", 400

    summary = get_ppt_from_upload(file_path)

    return {"status": "success", "payload": summary}
