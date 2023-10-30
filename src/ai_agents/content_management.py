```python
import nltk
from nltk.corpus import stopwords
from nltk.tokenize import word_tokenize
from nltk.stem import WordNetLemmatizer
from sklearn.feature_extraction.text import TfidfVectorizer
from sklearn.metrics.pairwise import cosine_similarity
import numpy as np
import random

class ContentManagementAgent:
    def __init__(self):
        self.contentIdeas = []
        self.stop_words = set(stopwords.words('english'))
        self.lemmatizer = WordNetLemmatizer()

    def preprocess_text(self, text):
        word_tokens = word_tokenize(text)
        lemmatized_tokens = [self.lemmatizer.lemmatize(w) for w in word_tokens if not w in self.stop_words]
        return lemmatized_tokens

    def generate_content_ideas(self, userProfile, brandCollaborations):
        for collab in brandCollaborations:
            idea = f"How about a post featuring the {collab['product']} from {collab['brand']}?"
            self.contentIdeas.append(idea)
        return self.contentIdeas

    def optimize_captions(self, captions):
        vectorizer = TfidfVectorizer().fit_transform(captions)
        vectors = vectorizer.toarray()
        csim = cosine_similarity(vectors)
        optimized_captions = []
        for index, caption in enumerate(captions):
            if csim[index].mean() < 0.5:
                optimized_captions.append(caption)
        return optimized_captions

contentManagementAgent = ContentManagementAgent()
```