import React from "react";
import { createContainer } from "meteor/react-meteor-data";
import { Session } from "meteor/session";
import { Meteor } from "meteor/meteor";
import { browserHistory } from "react-router";

import { Notes } from "../api/notes";

export class Editor extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      title: "",
      body: ""
    };
  }
  //an event callback funtion
  //call notes update method and pass in its argumets
  handleBodyChange(e) {
    const body = e.target.value; //allow us to update body
    this.setState({ body });
    this.props.call("notes.update", this.props.note._id, { body });
  }

  //takes an e arg and changed title
  handleTitleChange(e) {
    const title = e.target.value;
    this.setState({ title });
    this.props.call("notes.update", this.props.note._id, { title });
  }

  //handle delete item
  //add to history
  handleRemoval() {
    this.props.call("notes.remove", this.props.note._id);
    this.props.browserHistory.push("/dashboard");
  }

  //lifecycle method
  //watch for changes for this.props.note
  //if we switch from having a note to not having a note, want this to go to the state
  componentDidUpdate(prevProps, prevState) {
    const currentNoteId = this.props.note ? this.props.note._id : undefined;
    const prevNoteId = prevProps.note ? prevProps.note._id : undefined;

    //need a note to show
    if (currentNoteId && currentNoteId !== prevNoteId) {
      this.setState({
        title: this.props.note.title,
        body: this.props.note.body
      });
    }
  }
  render() {
    //we get a note and render it
    // we can also get an id but it wont be a match
    // we get nothing

    if (this.props.note) {
      return (
        <div className="editor">
          <input
            //do something everytime title is changed
            className="editor__title"
            value={this.state.title}
            placeholder="Untitled Item"
            onChange={this.handleTitleChange.bind(this)}
          />
          <textarea
            className="editor__body"
            value={this.state.body}
            placeholder="Notes on the item here"
            onChange={this.handleBodyChange.bind(this)} //run code whenever a value changes (ex somone typing a letter, we want to obtain that letter and save it to database)
          />
          <div>
            <button
              className="button button--secondary"
              onClick={this.handleRemoval.bind(this)}
            >
              Delete Item
            </button>
          </div>
        </div>
      );
    } else {
      return (
        <div className="editor">
          <p className="editor__message">
            {this.props.selectedNoteId
              ? "Item not found."
              : "Pick or create an item to get started."}
          </p>
        </div>
      );
    }
  }
}

Editor.propTypes = {
  note: React.PropTypes.object, //note is object
  selectedNoteId: React.PropTypes.string, //is  a string
  call: React.PropTypes.func.isRequired,
  browserHistory: React.PropTypes.object.isRequired
};

//sessiongetmethod to figure out what note is selected then fetch note and see if it exists
export default createContainer(() => {
  const selectedNoteId = Session.get("selectedNoteId");
  //query mongo database on the client. Load api file
  return {
    selectedNoteId,
    note: Notes.findOne(selectedNoteId),
    call: Meteor.call,
    browserHistory
  };
}, Editor);
