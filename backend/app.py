from flask import Flask, jsonify, redirect
import requests
from flask_cors import CORS

# The DogBreedsAPI class is used to interact with the public dog breeds API
# It has two main methods:
# 1. get_breeds_list() - Retrieves a list of all dog breeds and their variants
# 2. get_random_image(breed, subBreed) - Retrieves a random image of a specific breed and variant
class DogBreedsAPI:
    def __init__(self):
        self.url = 'https://dog.ceo/api/breeds/list/all'
        self.img_url = 'https://dog.ceo/api/breed/{}/{}/images/random'

    # Retrieves a list of all dog breeds and their variants
    def get_breeds_list(self):
        response = requests.get(self.url)
        data = response.json()
        breeds = data['message']
        breeds_with_variants = {breed: variants for breed, variants in breeds.items() if len(variants) > 0}
        return breeds_with_variants

    # Retrieves a random image of a specific breed and variant
    def get_random_image(self, breed, subBreed):
        url = self.img_url.format(breed, subBreed)
        response = requests.get(url)
        data = response.json()
        image_url = data['message']
        return image_url

# Create an instance of the DogBreedsAPI class
api = DogBreedsAPI()

# Initialize Flask app and enable CORS
app = Flask(__name__)
CORS(app)

# Endpoint to retrieve a list of all dog breeds and their variants
@app.route('/breeds', methods=['GET'])
def get_breeds():
    breeds_with_variants = api.get_breeds_list()
    return jsonify(breeds_with_variants)

# Endpoint to retrieve a random image of a specific breed and variant
@app.route('/image/<breed>/<subBreed>', methods=['GET'])
def get_image(breed, subBreed):
    image_url = api.get_random_image(breed, subBreed)
    return redirect(image_url)

if __name__ == '__main__':
    app.run(debug=True)
