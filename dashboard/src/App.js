import React, { Component, Fragment } from "react";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import "./App.css";

import About from "./components/pages/About";
import Alert from "./components/layout/Alert";
import Navbar from "./components/layout/Navbar";
import CacheBuster from "./components/utils/CacheBuster";
import Search from "./components/utils/Search";
import Course from "./components/courses/Course";
import Courses from "./components/courses/Courses";
import Word from "./components/words/Word";
import Words from "./components/words/Words";
import {
  apiCourses,
  apiCourse,
  apiCourseWords,
  apiCourseWord,
  apiWords,
  apiWord,
} from "./components/utils/MasterpieceAPI";

class App extends Component {
  state = {
    courses: [],
    filteredCourses: [],
    course: {},
    words: [],
    filteredWords: [],
    word: {},
    loading: false,
    alert: null,
    isSearching: false,
  };

  courses = async () => {
    this.setState({ loading: true });
    this.setState({ isSearching: false });
    const res = await apiCourses();
    this.setState({ courses: res.data, loading: false });
  };

  course = async ({ co_id }) => {
    this.setState({ loading: true });
    const res = await apiCourse(co_id);
    this.setState({ course: res.data[0], loading: false });
  };

  courseWords = async ({ co_id }) => {
    this.setState({ loading: true });
    this.setState({ isSearching: false });
    const res = await apiCourseWords(co_id);
    this.setState({ words: res.data, loading: false });
  };

  courseWord = async ({ co_id, wo_id }) => {
    this.setState({ loading: true });
    const res = await apiCourseWord(co_id, wo_id);
    this.setState({ word: res.data[0], loading: false });
  };

  words = async () => {
    this.setState({ loading: true });
    this.setState({ isSearching: false });
    const res = await apiWords();
    this.setState({ words: res.data, loading: false });
  };

  word = async ({ wo_id }) => {
    this.setState({ loading: true });
    const res = await apiWord(wo_id);
    this.setState({ word: res.data[0], loading: false });
  };

  performSearch = async (
    text,
    searchWordOnly,
    searchWordOnlyKeys,
    exactMatch,
    items
  ) => {
    this.setState({ loading: true, isSearching: true });
    var filteredItems = [];
    let textLowerSplit = text.toLowerCase().split(/[\s/]+/);
    items.forEach((item) => {
      let res = textLowerSplit.every((splittedText) => {
        return Object.entries(item).some(([key, value]) => {
          if (searchWordOnly && !searchWordOnlyKeys.includes(key)) return false;
          if (exactMatch) {
            let valueLowerSplit = value.toLowerCase().split(/[\s/]+/);
            return valueLowerSplit.some((splittedValue) => {
              return (
                splittedValue.replace(/[(),;.]/g, "") ===
                splittedText.replace(/[(),;.]/g, "")
              );
            });
          } else {
            return value.toLowerCase().includes(splittedText);
          }
        });
      });
      res && filteredItems.push(item);
    });
    return filteredItems;
  };

  // perform the course search locally instead of via the API
  searchCourse = async ({ text, searchWordOnly, exactMatch }) => {
    let searchWordOnlyKeys = ["name"];
    let items = this.state.courses;
    let filtered = await this.performSearch(
      text,
      searchWordOnly,
      searchWordOnlyKeys,
      exactMatch,
      items
    );
    this.setState({ filteredCourses: filtered, loading: false });
  };

  // perform the word search locally instead of via the API
  searchWord = async ({ text, searchWordOnly, exactMatch }) => {
    let searchWordOnlyKeys = ["dutch", "english"];
    let items = this.state.words;
    let filtered = await this.performSearch(
      text,
      searchWordOnly,
      searchWordOnlyKeys,
      exactMatch,
      items
    );
    this.setState({ filteredWords: filtered, loading: false });
  };

  // show an alert
  setAlert = (msg, type) => {
    // store the msg and type information in alert object in state
    this.setState({ alert: { msg, type } });
    // if the timeout was already set, unset the timeout to reset it to the full period
    if (this.timeoutID !== null) {
      clearTimeout(this.timeoutID);
    }
    // set the timeout and store the timeout ID
    this.timeoutID = setTimeout(() => {
      this.setState({ alert: null });
    }, 5000);
  };

  render() {
    const {
      courses,
      filteredCourses,
      course,
      words,
      filteredWords,
      word,
      loading,
      isSearching,
    } = this.state;

    return (
      <Router>
        <div
          className="App"
          style={{
            height: "100vh",
            display: "flex",
            flexDirection: "column",
          }}
        >
          <Navbar loading={loading} />
          <CacheBuster>
            {({
              loading,
              isLatestVersion,
              currentVersion,
              latestVersion,
              refreshCacheAndReload,
            }) => {
              if (!loading && !isLatestVersion) {
                return (
                  <div
                    style={{
                      color: "var(--danger-color)",
                      marginLeft: "auto",
                      marginRight: "auto",
                      padding: "1em",
                    }}
                    onClick={refreshCacheAndReload}
                  >
                    There is a new version of the masterpiece dashboard
                    available!
                    <br />
                    You are using {currentVersion} and {latestVersion} is
                    available.
                    <br /> Click on this message to reload the window. <br />
                    If this doesn't work try pressing Ctrl+F5 to force refresh
                  </div>
                );
              }
              return null;
            }}
          </CacheBuster>
          <Alert alert={this.state.alert} />
          <Switch>
            <Route
              exact
              path={["/", "/words"]}
              render={(props) => (
                <div className="container">
                  <Fragment>
                    <Search
                      itemName="words"
                      searchItems={this.searchWord}
                      showAllItems={this.words}
                      isSearching={isSearching}
                      setAlert={this.setAlert}
                    />
                    <Words
                      loading={loading}
                      words={isSearching ? filteredWords : words}
                    />
                  </Fragment>
                </div>
              )}
            />
            <Route
              exact
              path="/courses"
              render={(props) => (
                <div className="container">
                  <Fragment>
                    <Search
                      itemName="courses"
                      searchItems={this.searchCourse}
                      showAllItems={this.courses}
                      isSearching={isSearching}
                      setAlert={this.setAlert}
                    />
                    <Courses
                      loading={loading}
                      courses={isSearching ? filteredCourses : courses}
                    />
                  </Fragment>
                </div>
              )}
            />
            <Route
              exact
              path="/course/:co_id"
              render={(props) => (
                <div className="container">
                  <Course
                    {...props}
                    getCourse={this.course}
                    course={course}
                    loading={loading}
                  />
                </div>
              )}
            />
            <Route
              exact
              path="/course/:co_id/words"
              render={(props) => (
                <div className="container">
                  <Fragment>
                    <Link to={`../${props.match.params.co_id}`} className="btn">
                      Back to Course
                    </Link>
                    <Search
                      itemName="words"
                      searchItems={this.searchWord}
                      showAllItems={this.courseWords}
                      showAllItemsArgs={{ co_id: props.match.params.co_id }}
                      isSearching={isSearching}
                      setAlert={this.setAlert}
                    />
                    <Words
                      loading={loading}
                      words={isSearching ? filteredWords : words}
                    />
                  </Fragment>
                </div>
              )}
            />
            <Route
              exact
              path="/course/:co_id/word/:wo_id"
              render={(props) => (
                <div className="container">
                  <Word
                    {...props}
                    getWord={this.courseWord}
                    word={word}
                    loading={loading}
                  />
                </div>
              )}
            />
            <Route
              exact
              path="/word/:wo_id"
              render={(props) => (
                <div className="container">
                  <Word
                    {...props}
                    getWord={this.word}
                    word={word}
                    loading={loading}
                  />
                </div>
              )}
            />
            <Route
              exact
              path="/about"
              render={(props) => (
                <div className="container">
                  <About />
                </div>
              )}
            />
          </Switch>
        </div>
      </Router>
    );
  }
}

export default App;
