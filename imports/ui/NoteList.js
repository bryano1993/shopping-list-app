import React from "react";
import { Meteor } from "meteor/meteor";
import { createContainer } from "meteor/react-meteor-data";
import { Session } from "meteor/session";

import { Notes } from "../api/notes";
import NoteListHeader from "./NoteListHeader";
import NoteListItem from "./NoteListItem";
//render empty note message when notes array is empty
import NoteListEmptyItem from "./NoteListEmptyItem";

//stateless function component
//Will render a note list header and its Listitem
export const NoteList = props => {
  return (
    <div className="item-list">
      <NoteListHeader />
      {props.notes.length === 0 ? <NoteListEmptyItem /> : undefined}
      {props.notes.map(note => {
        return <NoteListItem key={note._id} note={note} />;
      })}
    </div>
  );
};

NoteList.propTypes = {
  //propttype is called notes with an array and is required
  notes: React.PropTypes.array.isRequired
};
//very important. Allows us to do lots of functionalities
export default createContainer(() => {
  const selectedNoteId = Session.get("selectedNoteId");

  Meteor.subscribe("notes");

  return {
    //fetching data from database
    notes: Notes.find(
      {},
      {
        //prop called notes is all notes aviable for user to edit
        sort: {
          updatedAt: -1
        }
      }
    )
      //determine whether they are the selected note and give them custom styles
      //if there are any changes, we have to rerender the list
      .fetch()
      .map(note => {
        return {
          ...note,
          selected: note._id === selectedNoteId
        };
      })
  };
}, NoteList);
