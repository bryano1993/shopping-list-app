import React from "react";
import moment from "moment"; //libraru that will render a date
import { Session } from "meteor/session";
import { createContainer } from "meteor/react-meteor-data";
//will render one time for every item in the database
export const NoteListItem = props => {
  const className = props.note.selected ? "item item--selected" : "item";

  return (
    //return jsx. will render item title and date when item was created
    <div
      className={className}
      onClick={() => {
        props.Session.set("selectedNoteId", props.note._id);
      }}
    >
      <h5 className="item__title">{props.note.title || "Untitled Item"}</h5>
      <p className="item__subtitle">
        {moment(props.note.updatedAt).format("M/DD/YY")}
      </p>
    </div>
  );
};
//pass object into component which is note prop and session

NoteListItem.propTypes = {
  note: React.PropTypes.object.isRequired,
  Session: React.PropTypes.object.isRequired
};

//restructure to set up prop types
export default createContainer(() => {
  return { Session };
}, NoteListItem);
