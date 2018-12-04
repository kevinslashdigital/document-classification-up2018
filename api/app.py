import sys,os
dir_path = os.path.dirname(os.path.realpath(__file__))
sys.path.append(dir_path + "/../core")
# print(dir_path,sys.path)

import json
from ..core.classifier import Classifier
from flask import request
from flask import jsonify
from flask import Flask
app = Flask(__name__)

# cd api
# FLASK_APP=app.py flask run
popular = {
  "agriculture": 0,
  "economic": 0,
  "entertainment": 0,
  "environment": 0,
  "health": 0,
  "jobcareer": 0,
  "sport": 0,
  "technology": 0
}

@app.route("/")
def hello():
  return "Hello World!"

@app.route('/classify', methods=['POST'])
def classify():
  body = request.get_json()
  # get from body
  doc = body['doc']
  print(body['doc'])
  config = {
    'text_dir': 'data/dataset/doc',
    'dataset': 'data/matrix',
    'bag_of_words': 'data/bag_of_words',
    'train_model': 'data/model/doc.model',
    'is_unicode': False
  }

  cf = Classifier(**config)
  pred = cf.classify(doc)
  global popular
  popular['sport'] = popular['sport'] + 1
  response = {
    "prediction" : pred[0],
    "popular": popular,
    "status" :"200"
  }

  return jsonify(response)
 