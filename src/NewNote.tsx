import {Fragment} from "react"
import { NoteData, Tag } from "./App";
import NoteForm from "./NoteForm";

type NewNoteProps = {
    onSubmit:(data:NoteData)=>void
    onAddTag:(tag:Tag)=>void
    availableTags:Tag[]
}


function NewNote({onSubmit,onAddTag,availableTags}:NewNoteProps){
    return (
        <Fragment>
            <h1>New Note</h1>
            <NoteForm onSubmit={onSubmit} onAddTag={onAddTag} availableTags={availableTags} />
        </Fragment>
    )
}

export default NewNote;