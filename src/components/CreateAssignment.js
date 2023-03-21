import React from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Link } from "react-router-dom";
import Cookies from "js-cookie";
import Button from "@mui/material/Button";
import Radio from "@mui/material/Radio";
import { DataGrid } from "@mui/x-data-grid";
import { SERVER_URL } from "../constants.js";
import TextField from "@mui/material/TextField";

class CreateAssignment extends React.Component {
  constructor(props) {
    super(props);
    this.state = { message: "Enter New Assignment Details" };
  }

  handleChange = (event) => {
    this.setState({ course_id: event.target.value });
  };

  otherChange = (event) => {
    this.setState({ assignment_name: event.target.value });
  };

  processDate = (event) => {
    this.setState({ due_date: event.target.value });
  };

  updateText = (newMessage) => {
    this.setState({ message: newMessage });
  };

  sendData = () => {
    // Guard Clause so ONLY iff all assignment details are inputted will the rest of the POST code go through.
    if (
      this.state.course_id == null ||
      this.state.due_date == null ||
      this.state.assignment_name == null
    ) {
      this.updateText("Error: Missing Assignment Details");
      return;
    }

    this.updateText("Enter New Assignment Details");
    // DEBUG: state checking for earlier if logic.
    console.log(this.state);

    const token = Cookies.get("XSRF-TOKEN");
    const fetchURL = `${SERVER_URL}/${this.state.course_id}/assignment/new/${this.state.assignment_name}/${this.state.due_date}/`;
    // DEBUG: Double checking URL for sanity.
    console.log(fetchURL);

    fetch(
      fetchURL,
      {
        method: "POST",
        headers: { "X-XSRF-TOKEN": token },
      }
    )
      .then((res) => {
        if (res.ok) {
          toast.success("Course successfully added", {
            position: toast.POSITION.BOTTOM_LEFT,
          });
        } else {
          toast.error("Error when adding", {
            position: toast.POSITION.BOTTOM_LEFT,
          });
          console.error("Post http status =" + res.status);
        }
      })
      .catch((err) => {
        toast.error("Error when adding", {
          position: toast.POSITION.BOTTOM_LEFT,
        });
        console.error(err);
      });
  };

  render() {
    return (
      <>
        <div>
          <h4> {this.state.message} </h4>
          <TextField
            id="testField"
            label="Assignment Name"
            name="assignment_name"
            onChange={this.otherChange}
          />
          <TextField
            label="Due Date"
            name="due_date"
            placeholder="YYYY-MM-DD"
            onChange={this.processDate}
          />
          <TextField
            label="Course Id"
            name="course_id"
            onChange={this.handleChange}
          />
        </div>
        <div>
          <Button
            component={Link}
            to={{ pathname: "/" }}
            variant="outlined"
            color="primary"
            style={{ margin: 10 }}
          >
            Return Home
          </Button>
          <Button
            variant="outlined"
            color="primary"
            style={{ margin: 10 }}
            onClick={this.sendData}
          >
            Create Assignment
          </Button>
        </div>
      </>
    );
  }
}

export default CreateAssignment;
