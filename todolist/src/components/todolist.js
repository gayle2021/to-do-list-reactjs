import {
  Card,
  Button,
  Form,
  Toast,
  Dropdown,
  Tabs,
  Tab,
} from "react-bootstrap";
import "./todolist.css";
import axios from "axios";
import { useEffect, useState } from "react";
import Completed from "./completed";
import Ongoing from "./ongoing";
import Upcoming from "./upcomig";
import Editmodal from "./editmodal";

function Todolist() {
  const [data, setData] = useState([]);
  const [key, setKey] = useState("All");

  const [task, setTask] = useState();
  const [s, setS] = useState([]);
  const [status, setStatus] = useState("Upcoming");
  const [id, setID] = useState();

  const [childrender, setChilderender] = useState(false);

  const rendr = (x) => {
    if (key === "All") {
      axios.get(`http://localhost:8080/show`).then((res) => {
        setData(res.data);
        if (childrender === false) {
          setChilderender(true);
        }
      });
    }
  };

  useEffect(() => {
    rendr();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [s, key]);

  const addtask = () => {
    axios
      .post("http://localhost:8080/add", { task: task, status: status })
      .then((res) => {
        setS([...s, 1]);
      });
  };

  const changeStatus = (e, i) => {
    axios.post(`http://localhost:8080/updatestatus/${i}/${e}`).then((res) => {
      setS([...s, 1]);
    });
  };



  const [show, setShow] = useState(false);
  const handleShow = () => {
    setShow(true);
  };
 
  const deletID = (e) => {
    axios.delete(`http://localhost:8080/delete/${e}`).then((res) => {
      setS([...s, 1]);
    });
  };

  return (
    <div>
      <Card className="card">
        <Card.Body>
          <Card.Title>Todo List</Card.Title>
          <br />

          <Form>
            <Form.Group className="mb-3" id="formgroup">
              <Form.Control
                type="text"
                placeholder="Add task"
                onChange={(event) => {
                  setTask(event.target.value);
                }}
              />
              <Dropdown id="dropd" className="d-inline mx-2">
                <Dropdown.Toggle id="dropdown-autoclose-true">
                  {status}
                </Dropdown.Toggle>

                <Dropdown.Menu>
                  <Dropdown.Item
                    name="Upcoming"
                    onClick={(e) => {
                      setStatus(e.target.name);
                    }}
                  >
                    Upcoming
                  </Dropdown.Item>
                  <Dropdown.Item
                    name="Ongoing"
                    onClick={(e) => {
                      setStatus(e.target.name);
                    }}
                  >
                    Ongoing
                  </Dropdown.Item>
                  <Dropdown.Item
                    name="Completed"
                    onClick={(e) => {
                      setStatus(e.target.name);
                    }}
                  >
                    Completed
                  </Dropdown.Item>
                </Dropdown.Menu>
              </Dropdown>
              <Button id="add" variant="primary" onClick={addtask}>
                Add
              </Button>
            </Form.Group>
          </Form>
        </Card.Body>
        <Card.Footer>
          <Tabs
            id="controlled-tab-example"
            activeKey={key}
            onSelect={(k) => setKey(k)}
            className="mb-3"
          >
            <Tab eventKey="All" title="All">
              {data.map((item) => {
                return (
                  <Toast key={item.id} id="toast">
                    <Toast.Body id="toastbody">{item.task}</Toast.Body>
                    <div id="buttons">
                      <Button
                        id="update"
                        onClick={(e) => {
                          setID(item.id);
                          handleShow();
                        }}
                        variant="success"
                      >
                        <i
                          className="fa fa-pencil-square-o"
                          aria-hidden="true"
                        ></i>
                      </Button>
                      <Button
                        id="delet"
                        onClick={(e) => {
                          deletID(item.id);
                        }}
                        variant="danger"
                      >
                        <i className="fa fa-trash" aria-hidden="true"></i>
                      </Button>
                      <div id="status">
                        <Dropdown className="d-inline mx-2">
                          <Dropdown.Toggle id="dropdown-autoclose-true">
                            {item.status}
                          </Dropdown.Toggle>

                          <Dropdown.Menu>
                            <Dropdown.Item
                              name="Upcoming"
                              id={item.id}
                              onClick={(e) => {
                                changeStatus(e.target.name, e.target.id);
                              }}
                            >
                              Upcoming
                            </Dropdown.Item>
                            <Dropdown.Item
                              name="Ongoing"
                              id={item.id}
                              onClick={(e) => {
                                changeStatus(e.target.name, e.target.id);
                              }}
                            >
                              Ongoing
                            </Dropdown.Item>
                            <Dropdown.Item
                              name="Completed"
                              id={item.id}
                              onClick={(e) => {
                                changeStatus(e.target.name, e.target.id);
                              }}
                            >
                              Completed
                            </Dropdown.Item>
                          </Dropdown.Menu>
                        </Dropdown>
                      </div>
                    </div>
                  </Toast>
                );
              })}
            </Tab>
            <Tab eventKey="Upcoming" title="Upcoming">
              <Upcoming></Upcoming>
            </Tab>
            <Tab eventKey="Ongoing" title="Ongoing">
              <Ongoing></Ongoing>
            </Tab>
            <Tab eventKey="Completed" title="Completed">
              <Completed></Completed>
            </Tab>
          </Tabs>
        </Card.Footer>
      </Card>

      <Editmodal show={show} editid={id} rendr={rendr}></Editmodal>
      

export default Todolist;
