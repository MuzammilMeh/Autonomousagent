from flask import Flask, render_template,jsonify ,request
from flask_cors import CORS
import requests
from model import get_llm_response
import time

app = Flask(__name__)
CORS(app)  # Enable CORS for all routes
# @app.route('/')
# def index():
#     return render_template('index.html')

@app.route('/get_name',methods=['GET'])
def get_name():

    return jsonify({'message': 'hello world'})


@app.route('/post_data', methods=['POST'])
def post_data():
    try:
        start_time = time.time()
        data = request.json 
        print(data, data)
        response = {'message': 'Data received successfully', 'data': data}
        get_llm_response(data)
        end_time = time.time()  # Record the end time
        execution_time = end_time - start_time
        print(f"\n Total execution time: {execution_time:.2f} seconds")
        return jsonify(response), 200
    except Exception as e:
        return jsonify({'error': str(e)}), 400

if __name__ == '__main__':
    app.run(debug=True)
