import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';

const ModalDelete = (props) => {
  return (
    <>
      <Modal show={props.show} onHide={props.handleClose} backdrop="static" keyboard={false}>
        <Modal.Header closeButton>
          <Modal.Title>Confirm Delete User</Modal.Title>
        </Modal.Header>
        <Modal.Body>Are you sure you want to delete this user: {props.dataModel.username}?</Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={props.handleClose}>
            Close
          </Button>
          <Button variant="primary" onClick={props.confirmDeleteUser}>
            Confirm
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default ModalDelete;
