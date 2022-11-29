import {Button, Col, Form, Modal, Row, Stack} from "react-bootstrap";

function EditTagModal({availableTags,handleClose,show}:EditTagsModalProps){
    return (
        <Modal show={show} onHide={handleClose} >
            <Modal.Header closeButton>
                <Modal.Title>Edit Tags</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form>  
                    <Stack gap={2}>
                        {
                            availableTags.map(tag=>{
                                <Row key={tag.id}>
                                    <Col>
                                        <Form.Control type="text" value={tag.label} />
                                    </Col>
                                    <Col xs="auto">
                                        <Button variant="outline-danger"  >&times;</Button>
                                    </Col>
                                </Row>
                            })
                        }
                    </Stack>
                </Form>
            </Modal.Body>
        </Modal>
    )
}


export default EditTagModal;