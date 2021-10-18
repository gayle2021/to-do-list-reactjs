import { useState } from "react";
import axios from "axios";
import { Button, Table } from "react-bootstrap";
import DateRangePicker from "react-bootstrap-daterangepicker";

function Reports() {
  const [total, setTotal] = useState(0);
  const [obtain, setObtain] = useState(0);
  const [task, setTask] = useState([]);

  const calculation = (a, b) => {
    var x = ((a / b) * parseInt(100)).toFixed(2);
    if (isNaN(x)) {
      return 0;
    } else if (!isFinite(x)) {
      return 0;
    } else {
      return x;
    }
  };
  const seventotal = () => {
    axios.get("http://localhost:8080/show").then((res) => {
      setTotal(res.data.length);
    });
  };
  const show7day = () => {
    axios.get("http://localhost:8080/sevendreport").then((res) => {
      setObtain(res.data.length);
      seventotal();
    });
  };

  const handleCallback = (start, end, label) => {
    const s = start.format("YYYY-MM-DD");
    const e = end.format("YYYY-MM-DD");
    axios
      .post(`http://localhost:8080/getinbetween`, {
        start: s,
        end: e,
      })
      .then((res) => {
        setObtain(res.data.length);
        seventotal();
        return res;
      })
      .then((res) => {
        setTask(res.data);
      });
  };

  return (
    <div>
      <br />
      <Button variant="info" onClick={show7day}>
        SHOW 7 day report
      </Button>
      <br />
      <br />
      <p>completed tasks : </p>
      <p>{calculation(obtain, total)} </p>
      <DateRangePicker onCallback={handleCallback}>
        <button type="button" className="btn btn-primary">
          click to open
        </button>
      </DateRangePicker>
      <br />
      <br />
      <Table striped bordered hover style={{ width: "50%", marginLeft: "25%" }}>
        <thead>
          <tr>
            <th>Task</th>
            <th>completed_at</th>
          </tr>
        </thead>
        <tbody>
          {task.map((item) => {
            return (
              <tr>
                <td>{item.task}</td>
                <td>
                  {item.completed_at.substring(
                    0,
                    item.completed_at.length - 14
                  )}
                  {console.log(item)}
                </td>
              </tr>
            );
          })}
        </tbody>
      </Table>
    </div>
  );
}

export default Reports;
