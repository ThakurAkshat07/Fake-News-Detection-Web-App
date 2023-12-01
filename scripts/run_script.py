
# Importing the model and the tokenizer from our saved models folder:
import sys
import pickle
from keras.preprocessing.sequence import pad_sequences
from keras.models import load_model
import pathlib

# Finding the path to parent directory of run_script
dirName = pathlib.Path(__file__).parent.resolve()
dirName = dirName.parent.resolve()
dirName = str(dirName)

# loading our model from the fnd_model file:
file_name = dirName + "/trained_models/fnd_model.h5"
loaded_model = load_model(file_name)


# Using pickle library to load our tokenizer store in pickle file:
tokenizer = 'hello world'
token_path = dirName + "/trained_models/tokenizer.pickle"
with open(token_path, 'rb') as handle:
    tokenizer = pickle.load(handle)
maxSize = 1000
#check = "Hello World"
check = [sys.argv[1]]
check = tokenizer.texts_to_sequences(check)
check = pad_sequences(check,maxlen = maxSize)
ans = (loaded_model.predict(check) >= 0.5).astype(int)
sys.stdout.flush()
print(ans[0][0])