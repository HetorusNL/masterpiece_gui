from flask import Flask, jsonify

from vocabulary_db import VocabularyDB
from db_watcher import DBWatcher

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


if __name__ == "__main__":
    database_file = "/opt/masterpiece/masterpiece_db/dictionary.json"

    # initialize the vocabulary database
    _vocabulary_db = VocabularyDB(database_file)
    _vocabulary_db.update()

    # initialize the DB watcher that updates the database on file system events
    _db_watcher = DBWatcher(database_file, _vocabulary_db)
    _db_watcher.watch()

    # run the api and when stopped/crashed stop the watcher
    try:
        api.run(port=5001)
    finally:
        _db_watcher.stop()
