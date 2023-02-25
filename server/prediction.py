import os
import sys
sys.path.insert(0, os.path.abspath(
    os.path.join(os.path.dirname(__file__), '..')))
from flask_cors import cross_origin, CORS
from model.main import get_ppt_from_upload
from model.soup import get_ppt_from_url
from flask import request
from flask import Blueprint



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
        from_upload = request.get_json()
        url = request.get_json()
        file_path = request.get_json()
        print(from_upload, url, file_path)
        if (url and from_upload == 1):
            res = get_ppt_from_url(url)
        else:
            res = get_ppt_from_upload(file_path["file_path"])
    except:
        return "Error in body", 400

    if not file_path:
        return "Something went wrong", 404


    return {"status": "success"}
