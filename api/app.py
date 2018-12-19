import sys,os
from flask_cors import CORS
dir_path = os.path.dirname(os.path.realpath(__file__))
sys.path.append(dir_path + "/../core")
# print(dir_path,sys.path)

import json
from ..core.classifier import Classifier
from flask import request
from flask import jsonify
from flask import Flask
app = Flask(__name__)
CORS(app)

# cd api
# FLASK_APP=app.py flask run
popular = {
  "កសិកម្ម": 0,
  "សេដ្ឋកិច្ច": 0,
  "កំសាន្ត": 0,
  "បរិស្ថាន": 0,
  "សុខភាព": 0,
  "ការងារ": 0,
  "កីឡា": 0,
  "បច្ចេកវិទ្យា": 0
}

@app.route("/")
def hello():
  return "Hello World!"

@app.route('/classify', methods=['POST'])
def classify():
  body = request.get_json()
  # get from body
  doc = body['doc']
  print('body', doc)
  config = {
    'text_dir': 'data/dataset/doc',
    'dataset': 'data/matrix',
    'bag_of_words': 'data/bag_of_words',
    'train_model': 'data/model/doc.model',
    'is_unicode': True
  }

  cf = Classifier(**config)
  pred = cf.classify(doc)
  global popular
  translate = {
    "agriculture": "កសិកម្ម",
    "economic": "សេដ្ឋកិច្ច",
    "entertainment": "កំសាន្ត",
    "environment": "បរិស្ថាន",
    "health": "សុខភាព",
    "jobcareer": "ការងារ",
    "sport": "កីឡា",
    "technology": "បច្ចេកវិទ្យា"
  }
  popular[translate[pred[0]]] = popular[translate[pred[0]]] + 1

  response = {
    "prediction" : translate[pred[0]],
    "popular": popular,
    "status" :"200"
  }

  return jsonify(response)
 