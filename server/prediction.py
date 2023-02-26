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
        req_body = request.get_json()
        print(req_body)
        if (req_body["url"] and not req_body["from_upload"]):
            res = get_ppt_from_url(req_body["url"])
        else:
            res = get_ppt_from_upload(req_body["file_path"])
    except:
        return "Error in body", 400

    return {"status": "success"}
