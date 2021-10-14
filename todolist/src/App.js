import "./App.css";
import Todolist from "./components/todolist";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import Reports from "./components/reports";
import { Button } from "react-bootstrap";
import "bootstrap-daterangepicker/daterangepicker.css";

function App() {
  return (
    <div className="App">
      <Router>
        <br />
        <Link to={"/"}>
          <Button style={{ marginRight: "20px" }} variant="dark">
            To Do List
          </Button>
        </Link>

        <Link to={"/analytics"}>
          <Button style={{ marginLeft: "20px" }} variant="dark">
            Analytics
          </Button>
        </Link>
        {/* <Todolist></Todolist> */}
        <Switch>
          <Route exact path="/" component={Todolist} />
          <Route exact path="/analytics" component={Reports} />
        </Switch>
      </Router>
    </div>
  );
}

export default App;
