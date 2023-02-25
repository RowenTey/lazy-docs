from tkinter import N
from urllib import request
from flask import Blueprint
from flask import request
from model.lib.agent import OpenAIAgent


bp = Blueprint("prediction", __name__, url_prefix="/prediction")


@bp.route("/predict")
def predict():
    filename = request.args.get("filename")
    from_upload = request.args.get("fromUpload")

    if from_upload:
        agent = OpenAIAgent(filename="test1.pdf")
        agent.get_content()
        agent.get_page_by_page_summary()
        print(agent.get_overall_summary())

    # x = np.array([sepal_length, sepal_width, petal_length, petal_width], ndmin=2)

    # prediction = classifier.predict(x)

    # if prediction is None:
    #     return "Something went wrong", 400

    return {"status": "success"}
