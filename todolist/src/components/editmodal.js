import { Button, Form, Modal } from "react-bootstrap";
import { useEffect, useState } from "react";
import axios from "axios";

function Editmodal(props) {

  console.log(props.show);

  const [updatedTask, setupdatedTask] = useState("company");
  const [s, setS] = useState([]);

  const editTask = (e) => {
    axios
      .post(`http://localhost:8080/updatetask/${e}`, {
        task: updatedTask,
      })
      .then((res) => {
        props.rendr(false);
        // console.log(res.data);
        console.log(props);
        handleClose();
      });
  };

  const [show, setShow] = useState(false);

  const handleShow = () => {
    setShow(true);
  };

  const handleClose = () => {
    setShow(false);
  };

  useEffect(() => {
    if (props.show === true) {
      handleShow();
    } else {
      // handleClose();
      // handleShow();
    }
  }, [props.show, s]);

  return (
    <Modal show={show}>
      <Modal.Header>
        <Modal.Title>Update Task</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form.Control
          type="text"
          onChange={(e) => {
            setupdatedTask(e.target.value);
          }}
          placeholder="update task"
        />
      </Modal.Body>
      <Modal.Footer>
        <Button
          variant="primary"
          onClick={(e) => {
            editTask(props.editid);
          }}
        >
          submit
        </Button>
        <Button variant="secondary" onClick={handleClose}>
          Close
        </Button>
      </Modal.Footer>
    </Modal>
  );
}

export default Editmodal;
