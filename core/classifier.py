"""
    Chatbot class
"""
import argparse

from khmerml.machine_learning import MachineLearning
from lib.preprocessing_data import Preprocessing
from khmerml.utils.file_util import FileUtil

class Classifier():

  def __init__(self,from_main=True, *args, **kwargs):
    if from_main == True :
      config = {
        'text_dir': 'data/dataset/doc',
        'dataset': 'data/matrix',
        'bag_of_words': 'data/bag_of_words',
        'train_model': 'data/model/doc.model',
        'is_unicode': True
      }
    else:
      config = kwargs

    self.ml = MachineLearning(**config)
    # choose your algorithm
    self.algo = self.ml.NiaveBayes()
    # algo = ml.DecisionTree(criterion='gini', prune='depth', max_depth=50, min_criterion=0.05)
    self.prepro = Preprocessing(**config)
    # print ("Start testing with the classifier !")
    self.model = self.algo.load_model()
  
  def classify(self,question = "គ្រូពេទ្យ​ត្រូវ​តែ​មាន​វិជ្ជាជីវៈ​ពិតប្រាកដ ដើម្បី​សង្គ្រោះ​អាយុ​ជី​វិត​អ្នកជំងឺ"):
    # preprocess
    mat = self.prepro.loading_single_doc(question, 'doc_freq', 1)
    print('mat',mat)
    prediction = self.algo.predict(self.model, [mat])
    label = self.ml.to_label(prediction, 'data/bag_of_words/label_match.pickle')
    print(label)
    return label


if __name__ == "__main__" :
  

  cf = Classifier(from_main=True)
  cf.classify(question="គ្រូពេទ្យ​ត្រូវ​តែ​មាន​វិជ្ជាជីវៈ​ពិតប្រាកដ ដើម្បី​សង្គ្រោះ​អាយុ​ជី​វិត​អ្នកជំងឺ")