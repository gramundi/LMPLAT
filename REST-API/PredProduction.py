import pickle
import re
from nltk.corpus import wordnet

# Creating the Bag of Words model
from sklearn.feature_extraction.text import CountVectorizer
cv = CountVectorizer(vocabulary=pickle.load(open("feature.pkl", "rb")),max_features = 1500)


# load the model from disk
filename = 'finalized_model.sav'
loaded_model = pickle.load(open(filename, 'rb'))
#result = loaded_model.score(X_test, y_test)
#print(result)


newreview=['good as chocholate']
new = cv.transform(newreview).toarray()
new_pred=loaded_model.predict(new)

print(new_pred)
if (new_pred > 0):
    print("I predict this is a GOOD Review")
    #return jsonify({"result":str(new_pred)})
else:
    print("I predict this is a BAD Review")
    #return jsonify({"result":str(new_pred)})

def is_english_word_old(word):
     if wordnet.synsets(word):
         return True
     else:
         return False

def is_english_word(word):
    dictionary = pickle.load(open("English.pkl", 'rb'))
    try:
        x = dictionary[word]
        return True
    except KeyError:
        return False


def parse_review(review):    
    review = re.sub('[^a-zA-Z]', ' ', review)
    review = review.lower()
    review_words = review.split()
    #print(review_words)
    stop_words = pickle.load(open("Stopwords.pkl", 'rb'))
    review_words = [word for word in review_words if word not in set(stop_words) ]
    #print(review_words)     
    for word in review_words:
        if ( not( is_english_word(word) ) ):
            print("%s is not an english word",word)
            return False
    return True

#print(parse_review("was la JHUIIO the an Good "))  
