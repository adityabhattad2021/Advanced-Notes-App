import { Fragment, useMemo, useState } from "react";
import { Col, Form, Row, Stack, Button } from "react-bootstrap";
import { Link } from "react-router-dom";
import ReactSelect from "react-select";
import { Tag } from "./App";
import EditTagModal from "./EditTagModal";
import NoteCard, { SimplifiedNote } from "./NoteCard";

type NoteListProps = {
	availableTags: Tag[];
	notes: SimplifiedNote[];
	updateTag:(id: string, label: string)=>void;
	deleteTag:(id: string)=>void;
};

function NoteList({ availableTags, notes,updateTag,deleteTag }: NoteListProps) {
	const [selectedTags, setSelectedTags] = useState<Tag[]>([]);
	const [title, setTitle] = useState("");
	const [editTagsModalIsOpen, setEditTagsModalIsOpen] = useState(false);

	const filteredNotes = useMemo(() => {
		return notes.filter((note) => {
			return (
				(title === "" ||
					note.title.toLowerCase().includes(title.toLowerCase())) &&
				(selectedTags.length === 0 ||
					selectedTags.every((tag) =>
						note.tags.some((noteTag) => noteTag.id === tag.id)
					))
			);
		});
	}, [title, selectedTags, notes]);


	return (
		<Fragment>
			<Row className="align-items-center mb-4">
				<Col>
					<h1>Notes</h1>
				</Col>
				<Col xs="auto">
					<Stack gap={2} direction="horizontal">
						<Link to="/new">
							<Button variant="primary">Create</Button>
						</Link>
						<Button variant="outline-secondary" onClick={()=>{
							setEditTagsModalIsOpen(true)
						}}>Edit Tags</Button>
					</Stack>
				</Col>
			</Row>
			<Form>
				<Row className="mb-4">
					<Col>
						<Form.Group controlId="title">
							<Form.Label>Title</Form.Label>
							<Form.Control
								type="text"
								value={title}
								onChange={(e) => setTitle(e.target.value)}
							/>
						</Form.Group>
					</Col>
					<Col>
						<Form.Group controlId="tags">
							<Form.Label>Tags</Form.Label>
							<ReactSelect
								value={selectedTags.map((tag) => {
									return { label: tag.label, value: tag.id };
								})}
								options={availableTags.map((tag) => {
									return { label: tag.label, value: tag.id };
								})}
								onChange={(tags) => {
									setSelectedTags(
										tags.map((tag) => {
											return {
												label: tag.label,
												id: tag.value,
											};
										})
									);
								}}
								isMulti
							/>
						</Form.Group>
					</Col>
				</Row>
			</Form>
			<Row xs={1} sm={2} lg={3} xl={4} className="g-3">
				{filteredNotes.map((note) => {
					return (
						<Col key={note.id}>
							<NoteCard
								id={note.id}
								title={note.title}
								tags={note.tags}
							/>
						</Col>
					);
				})}
			</Row>
			<EditTagModal show={editTagsModalIsOpen} handleClose={()=>setEditTagsModalIsOpen(false)} availableTags={availableTags} updateTag={updateTag} deleteTag={deleteTag} />
		</Fragment>
	);
}

export default NoteList;
