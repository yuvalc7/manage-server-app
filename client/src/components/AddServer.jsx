import React, { Component } from "react";
import { TextField, Button, FormHelperText } from "@material-ui/core";

import InputLabel from "@material-ui/core/InputLabel";
import MenuItem from "@material-ui/core/MenuItem";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";

import serversTypes from "../types/serversTypes";

import "../styles/AddServer.css";

class AddServer extends Component {
  constructor(props) {
    super(props);
  }

  state = {
    currentServer: {
      server_name: "",
      ip_address: "",
      type: {
        name: "",
        price: 0,
        serverTypeIndex: 0,
      },
      timer: {
        time: 0,
        start: 0,
      },
    },
    errorMessageServerName: "",
    errorMessageIP: "",
    errorMessageSelectType: "",
  };

  handleInputChange = (event) => {
    this.setState((prevState) => ({
      currentServer: {
        ...prevState.currentServer,
        [event.target.name]: event.target.value,
      },
    }));
  };
  handleSelectServerType = (event) => {
    let serverTypeIndex = event.target.value;
    const { name, price } = serversTypes[serverTypeIndex];
    this.setState((prevState) => ({
      currentServer: {
        ...prevState.currentServer,
        type: {
          name,
          price,
          serverTypeIndex,
        },
      },
    }));
  };

  validateFormAndSubmit = (e) => {
    e.preventDefault();
    if (this.ValidateIpAndServerName()) {
      const { handleSubmit } = this.props;
      const { currentServer } = this.state;
      handleSubmit(e, currentServer);
      this.clearStateData();
      alert("server added succecfully !!!");
    }
  };

  ValidateIpAndServerName() {
    let letters = /^[A-Za-z\s]*$/;
    let ipformat =
      /^(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)$/;
    let matchLetterPattern =
      this.state.currentServer.server_name.match(letters);
    let matchIpPattern = this.state.currentServer.ip_address.match(ipformat);
    matchLetterPattern
      ? this.setState({ errorMessageServerName: "" })
      : this.setState({
          errorMessageServerName: "Only English letters are allowed",
        });
    matchIpPattern
      ? this.setState({ errorMessageIP: "" })
      : this.setState({ errorMessageIP: "Invalid IP address" });

    let selected = this.state.currentServer.type.name;
    selected
      ? this.setState({ errorMessageSelectType: "" })
      : this.setState({ errorMessageSelectType: "Type not selected" });

    return matchLetterPattern && matchIpPattern && selected;
  }

  clearStateData = () => {
    this.setState({
      currentServer: {
        server_name: "",
        ip_address: "",
        type: {
          name: "",
          price: 0,
        },
        timer: {
          time: 0,
          start: 0,
        },
      },
      errorMessageServerName: "",
      errorMessageIP: "",
    });
  };

  render() {
    const {
      currentServer,
      errorMessageIP,
      errorMessageServerName,
      errorMessageSelectType,
    } = this.state;
    return (
      <form
        onSubmit={(e) => {
          this.validateFormAndSubmit(e);
        }}
        className="flex add-server-container"
      >
        <div className="input-server-data-container">
          <div className="input-server-data" style={{ marginRight: "25px" }}>
            <InputLabel className="lable-inputs" id="demo-simple-select-label">
              Server Name:
            </InputLabel>
            <TextField
              variant="outlined"
              size="small"
              name="server_name"
              style={{ width: "150px" }}
              value={currentServer.server_name}
              required={true}
              onChange={this.handleInputChange}
              placeholder="my server"
            ></TextField>
            {errorMessageServerName && (
              <h6 className="error" style={{ width: "100%", right: "-50px" }}>
                {errorMessageServerName}
              </h6>
            )}
          </div>
          <div className="input-server-data">
            <InputLabel className="lable-inputs" id="demo-simple-select-label">
              IP Address:
            </InputLabel>
            <TextField
              variant="outlined"
              size="small"
              name="ip_address"
              style={{ width: "150px" }}
              value={currentServer.ip_address}
              required={true}
              onChange={this.handleInputChange}
              placeholder="127.0.0.0"
            ></TextField>
            {errorMessageIP && <h6 className="error">{errorMessageIP}</h6>}
          </div>
        </div>
        <div className="select-server-and-add-button-container">
          <FormControl style={{ width: "150px", position: "relative" }}>
            <InputLabel id="demo-simple-select-label">Server Type</InputLabel>
            <Select
              labelId="demo-simple-select-helper-label"
              id="demo-simple-select-helper"
              required={true}
              onChange={this.handleSelectServerType}
            >
              {serversTypes.map((type, index) => (
                <MenuItem key={type.id} value={index}>
                  {type.name}
                </MenuItem>
              ))}
            </Select>
            {errorMessageSelectType && (
              <h6 className="error">{errorMessageSelectType}</h6>
            )}
          </FormControl>

          <Button
            variant="contained"
            style={{ height: "40px" }}
            color="primary"
            type="submit"
          >
            Add Server
          </Button>
        </div>
      </form>
    );
  }
}

export default AddServer;
