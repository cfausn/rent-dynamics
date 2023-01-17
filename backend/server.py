from flask import Flask, jsonify, redirect
import requests
from flask_cors import CORS

app = Flask(__name__)
CORS(app)

class DogBreedsAPI:
    def __init__(self):
        self.url = 'https://dog.ceo/api/breeds/list/all'
        self.img_url = 'https://dog.ceo/api/breed/{}/{}/images/random'

    def get_breeds_list(self):
        response = requests.get(self.url)
        data = response.json()
        breeds = data['message']
        breeds_with_variants = {breed: variants for breed, variants in breeds.items() if len(variants) > 0}
        return breeds_with_variants

    def get_variants_count(self):
        breeds_with_variants = self.get_breeds_list()
        variants_count = {breed: len(variants) for breed, variants in breeds_with_variants.items()}
        return variants_count

    def get_random_image(self, breed, subBreed):
        url = self.img_url.format(breed, subBreed)
        response = requests.get(url)
        data = response.json()
        image_url = data['message']
        return image_url

api = DogBreedsAPI()

@app.route('/breeds', methods=['GET'])
def get_breeds():
    breeds_with_variants = api.get_breeds_list()
    return jsonify(breeds_with_variants)

@app.route('/variantsCount', methods=['GET'])
def get_variants_count():
    variants_count = api.get_variants_count()
    return jsonify(variants_count)

@app.route('/image/<breed>/<subBreed>', methods=['GET'])
def get_image(breed, subBreed):
    image_url = api.get_random_image(breed, subBreed)
    return redirect(image_url)

if __name__ == '__main__':
    app.run(debug=True)
