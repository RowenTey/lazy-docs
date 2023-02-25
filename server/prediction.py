from tkinter import N
from urllib import request
from flask import Blueprint
from flask import request

import joblib

bp = Blueprint("prediction", __name__, url_prefix="/prediction")

# with open("ur file", "rb") as f:
#     classifier = joblib.load(f)

@bp.route("/predict")
def predict():
    sepal_length = request.args.get("sepallength")
    sepal_width = request.args.get("sepalwidth")
    petal_length = request.args.get("petallength")
    petal_width = request.args.get("petalwidth")
    
    if sepal_length is None:
        return "Sepal length data is missing", 400
    # if sepal_width is None:
    #     return "Sepal width data is missing", 400
    # if petal_length is None:
    #     return "Petal length data is missing", 400
    # if petal_width is None:
    #     return "Petal width data is missing", 400

    # x = np.array([sepal_length, sepal_width, petal_length, petal_width], ndmin=2)
    
    # prediction = classifier.predict(x)
    
    # if prediction is None:
    #     return "Something went wrong", 400
        
    return {"species": "test"}

    
