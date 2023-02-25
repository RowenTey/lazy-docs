from flask import Blueprint
from flask import request
from haystack.pipelines import Pipeline
from haystack.nodes import OpenAIAnswerGenerator
from haystack.schema import Document
from flask_cors import cross_origin
import openai


bp = Blueprint("chatbot", __name__, url_prefix="/chatbot")

# with open("ur file", "rb") as f:
#     classifier = joblib.load(f)

@bp.route("/chat", methods=["POST"])
@cross_origin()
def ask():
    try:
        question = request.get_json()
    
    except:
        return "Error in question", 400

    print(question)
    
    if question is None:
        return "Question is missing", 400
    
    doc_dir = "./data/user1/example.txt"

    docs = []
    
    with open(doc_dir, "r") as file:
        for line in file:
            docs.append(Document(line))
    
    node = OpenAIAnswerGenerator(
        api_key="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",
        model="text-davinci-003",
        max_tokens=80,
        presence_penalty=0.1,
        frequency_penalty=0.1,
        top_k=3,
        temperature=0.9
    )
    
    
    pipe = Pipeline()
    pipe.add_node(component=node, name="prompt_node", inputs=["Query"])
    
    output = pipe.run(query=question, documents=docs)
    
    if (not len(output["answers"])):
        return {"answer": "Sorry, I don't know the answer to that.", "error": "true"}
    
    return {"answer": output["answers"]}


# @bp.route("/ask")
# def ask():
#     question = "What is the results of this paper"
#     with open("./instance/user1.joblib", "rb") as f:
#         generator = joblib.load(f)
    
#     result = generator.run(
#         query=question,
#         params={"Retriever": {"top_k": 10}}
#     )
#     answers = []
    
#     return {"answer": result}
#     for answer in result["answers"]:
        
#         if (answer.score >= 0.5):
#             answers.append(answer.answer)
    
#     if (not answers):
#         return {"answer": "Sorry, I don't know the answer to that."}
    
    
#     openai.api_key = "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"
    
#     answerStr = " ".join(answers)
    
#     response = openai.Edit.create(
#         model="text-davinci-edit-001",
#         input= f"Question: {question} : Answer: {answerStr}",
#         instruction="Answer in full sentence"
#     )
    
#     question_offset = len("Question: ") + len(question) + len(" : Answer: ")
#     responseFormatted = response["choices"][0]["text"][question_offset:]
    
#     return {"answer": answer}
    
    


