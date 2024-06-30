from flask import Flask , request 
from  flask_cors import CORS , cross_origin
import dbConnect

app = Flask(__name__)
CORS(app)
# cors = CORS(app, resources={r"/*": {"origins": "*"}})  # for specfic resources
# @app.route("/")
# @cross_origin()

# obj=dbConnect.mySqlDB("localhost","root","123","test")

@app.route("/")
# @cross_origin()
def index():
    return 'Hello, World! from Main'

@app.route("/dbconnect", methods=["GET"])
def mySQLdbConnect():
    obj = connectToDB()
    result = obj.printHeader()
    return result

@app.route("/all", methods=["GET"])
def displayAll():
    obj = connectToDB()
    return  obj.selectAllData()     

@app.route("/id/<int:id>", methods=["GET"])
def SelectIdDetails(id):
    obj = connectToDB()
    result = obj.selectIdData(id)
    return result

@app.route("/add", methods=["POST"])
def InsertData():
    obj = connectToDB()
    name = request.args.get("name")
    add = request.args.get("add")
    result = obj.inserData(name,add)
    return result

@app.route('/foo', methods=['POST']) 
def foo():
    # data = request.get_data().count
    return request.args.get("name")

def connectToDB():
    obj=dbConnect.mySqlDB("localhost","root","123","test")
    return obj

if __name__ == '__main__':
    app.run(debug=True)

