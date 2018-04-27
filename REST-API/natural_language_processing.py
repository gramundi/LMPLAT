# Natural Language Processing

# Importing the libraries
import numpy as np
import matplotlib.pyplot as plt
import pandas as pd
import pickle

# Importing the dataset
dataset = pd.read_csv('Restaurant_Reviews.tsv', delimiter = '\t', quoting = 3)

# Cleaning the texts
import re
import nltk
nltk.download('stopwords')
nltk.download('words')

#Saving the Stop Words
from nltk.corpus import stopwords
stop_words = dict.fromkeys(stopwords.words(), None)
#Save The result of the feature transfor
pickle.dump(stop_words,open("Stopwords.pkl","wb"))

#Serialize English Words from NLTK
#from nltk.corpus import words as nltk_words
#dictionary = dict.fromkeys(nltk_words.words(), None)
#Save The result of the feature transfor
#pickle.dump(dictionary,open("English.pkl","wb"))




from nltk.stem.porter import PorterStemmer
corpus = []
for i in range(0, 1002):
    review = re.sub('[^a-zA-Z]', ' ', dataset['Review'][i])
    review = review.lower()
    review = review.split()
    ps = PorterStemmer()
    review = [ps.stem(word) for word in review if not word in set(stopwords.words('english'))]
    review = ' '.join(review)
    corpus.append(review)

# Creating the Bag of Words model
from sklearn.feature_extraction.text import CountVectorizer
cv = CountVectorizer(max_features = 1500)
X = cv.fit_transform(corpus).toarray()

#Save The result of the feature transfor
pickle.dump(cv.vocabulary_,open("feature.pkl","wb"))

y = dataset.iloc[:, 1].values

# Splitting the dataset into the Training set and Test set
from sklearn.cross_validation import train_test_split
X_train, X_test, y_train, y_test = train_test_split(X, y, test_size = 0.20, random_state = 0)

# Fitting Naive Bayes to the Training set
from sklearn.naive_bayes import GaussianNB
classifier = GaussianNB()
classifier.fit(X_train, y_train)

# Predicting the Test set results
y_pred = classifier.predict(X_test)

# Making the Confusion Matrix
from sklearn.metrics import confusion_matrix
cm = confusion_matrix(y_test, y_pred)

result1 = classifier.score(X_test, y_test)
print(result1)


# When we are happy about our result we can store our model to reuse it 
# later to make predictions

# save the model to disk
filename = 'finalized_model.sav'
pickle.dump(classifier, open(filename, 'wb'))


    
    
