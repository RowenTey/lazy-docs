from flask import Blueprint
from flask import request
import os
import sys
sys.path.insert(0, os.path.abspath(os.path.join(os.path.dirname(__file__), '..')))
from model.lib.load_images import load_images

bp = Blueprint("poster", __name__, url_prefix="/poster")

@bp.route("/image")
def image():
    try:
        load_images("../model/research_paper.pdf")
        return {"status": "success"}
    except:
        return {"status": "error"}


