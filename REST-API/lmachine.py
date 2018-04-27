from  flask import Flask,request,jsonify,render_template
from sklearn.feature_extraction.text import CountVectorizer
import pickle
import numpy as np
import logging

from flask_cors import CORS, cross_origin

app = Flask(__name__)
cors = CORS(app)

app.config['CORS_HEADERS'] = 'Content-Type'

@app.route('/', methods=['POST','OPTIONS'])
def main():
    # Creating the Bag of Words model
    return render_template('index.html')

@app.route('/predict', methods=['POST','OPTIONS'])
def PredReview():
    if request.json:
       review =request.get_json()
       review_text=review['review'] 
       print(review_text)
       from PredProduction import parse_review
       valid=parse_review(str(review_text))
    #print("Parse Review=%s",str(parse_review(str(review))))
    #print(review[0])
    # Creating the Bag of Words model
       cv = CountVectorizer(vocabulary=pickle.load(open("feature.pkl", "rb")),max_features = 1500)
    # load the model from disk
       filename = 'finalized_model.sav'
       loaded_model = pickle.load(open(filename, 'rb'))

    #review=['good as chocholate']
       new = cv.transform([review_text]).toarray()
       new_pred=loaded_model.predict(new)
    #new_pred=0
       print("I predict this is ",str(new_pred[0]))
       response = jsonify({"review":str(review),"result":str(new_pred[0]),"valid":valid})
       response.headers.add('Access-Control-Allow-Origin', '*')
       return response
    else:
       response = jsonify({"result":"NOK"})
       return response

@app.route('/correct',methods=['POST','OPTIONS'])
def Correct():
        if request.json:
             app.logger.debug('this is a json Request')
             correctpred=request.get_json()
             with open('review.tsv','a') as output:
                  output.write(correctpred['review']+ "\t" +correctpred['result']+"\n") 
             response = jsonify({"result":"OK"})
             return response
        else:
            response = jsonify({"result":"NOK"})
            return response

if __name__ == 'app':
    handler = RotatingFileHandler('foo.log', maxBytes=10000, backupCount=1)
    handler.setLevel(logging.INFO)
    app.logger.addHandler(handler)
