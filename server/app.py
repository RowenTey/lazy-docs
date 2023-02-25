from flask import Flask
import prediction
import chatbot
import os
from flask_cors import CORS, cross_origin
import poster

def create_app(test_config = None):
    app = Flask(__name__, instance_relative_config=True)
    cors = CORS(app)
    if test_config is None:
        pass
    else:
        app.config.from_mapping(test_config)
        
    try:
        os.makedirs(app.instance_path)
    except OSError:
        pass
    
    app.register_blueprint(prediction.bp)
    app.register_blueprint(chatbot.bp)
    app.register_blueprint(poster.bp)
    
    @app.route("/")
    def hello():
        return "Hello World"
    
    return app

if __name__ == "__main__":
    app = create_app()
    app.run(debug=True)