
from lib.preprocessing_data import Preprocessing

if __name__ == "__main__":
    config = {
        'text_dir': 'data/dataset/doc',
        'dataset': 'data/matrix',
        'bag_of_words': 'data/bag_of_words',
        'train_model': 'data/model/doc.model',
        'is_unicode': True
      }
    prepro = Preprocessing(**config)
    question="គ្រូពេទ្យ​ត្រូវ​តែ​មាន​វិជ្ជាជីវៈ​ពិតប្រាកដ ដើម្បី​សង្គ្រោះ​អាយុ​ជី​វិត​អ្នកជំងឺ"
    mat = prepro.loading_single_doc(question, 'doc_freq', 1)
