from flask import Flask, jsonify

from vocabulary_db import VocabularyDB

api = Flask(__name__)


@api.route("/courses")
def courses():
    return jsonify(_vocabulary_db.get_courses())


@api.route("/course/<string:co_id>")
def course(co_id):
    courses = _vocabulary_db.get_courses()
    course = list(filter(lambda a: a["id"] == co_id, courses))
    return jsonify(course)


@api.route("/course/<string:co_id>/words")
def course_words(co_id):
    vocabulary = _vocabulary_db.get_vocabulary()
    co_words = list(filter(lambda a: a["course"] == co_id, vocabulary))
    return jsonify(co_words)


@api.route("/course/<string:co_id>/word/<string:wo_id>")
def course_word(co_id, wo_id):
    vocabulary = _vocabulary_db.get_vocabulary()
    co_words = list(filter(lambda a: a["course"] == co_id, vocabulary))
    word = list(filter(lambda a: a["id"] == wo_id, co_words))
    return jsonify(word)


@api.route("/words")
def words():
    return jsonify(_vocabulary_db.get_vocabulary())


@api.route("/word/<string:wo_id>")
def word(wo_id):
    vocabulary = _vocabulary_db.get_vocabulary()
    word = list(filter(lambda a: a["id"] == wo_id, vocabulary))
    return jsonify(word)


@api.route("/update-database")
def update_database():
    _vocabulary_db.update()
    return jsonify({"result": "success"})


if __name__ == "__main__":
    # initialize the vocabulary database
    _vocabulary_db = VocabularyDB()
    _vocabulary_db.update()

    # run the api as a blocking call
    api.run(host="0.0.0.0")
