from flask import Flask, request, jsonify
from dbConnect import loginCreds
from flask_cors import CORS

app = Flask(__name__)
CORS(app, origins='http://localhost:3000')

@app.route('/login', methods=['POST'])
def login():
  username = request.json['username']
  password = request.json['password']

  # Call the loginCreds function with the username and password
  if loginCreds(username, password):
    return jsonify({'message': 'True'})
  else:
    return jsonify({'message': 'False'})
  
if __name__ == '__main__':
    app.run(debug=True, port=5000)
    print('Flask app running on port 5000')
