import "./App.css";
import React, { Component } from "react";

import currencyTypes from "./types/currencyTypes";

import { getConverCurrency } from "./services/currencyApi";

import DataTable from "./components/DataTable";

import {
  addServer,
  getServers,
  updateServer,
  deleteServer,
} from "./services/serverServices";
import AddServer from "./components/AddServer";
import serversTypes from "./types/serversTypes";

import CurrencyConverter from "./components/CurrencyConverter";

var intervals = {};

class App extends Component {
  state = {
    servers: [],
    currency: "",
    converter: 1,
    converterSymbl: "$",
    indexCurrencyTypes: 0,
  };

  componentDidMount() {
    this.onGetServers();
  }
  onGetServers = async () => {
    try {
      const { data } = await getServers();
      if (Object.keys(intervals).length === 0) {
        Object.values(data).map((val) => (val["isRunning"] = false));
      }
      this.setState({ servers: data });
    } catch (error) {
      console.log(error);
    }
  };
  handleSubmit = async (e, currentServer) => {
    e.preventDefault();
    const originalServers = this.state.servers;
    try {
      const { data } = await addServer({
        server: currentServer,
      });
      const servers = originalServers;
      servers.push(data);
      this.setState({
        servers,
      });
    } catch (error) {
      console.log(error);
    }
  };

  handleUpdate = async (currentServer) => {
    const originalServers = this.state.servers;
    try {
      const servers = [...originalServers];
      const index = servers.findIndex((server) => server._id === currentServer);
      servers[index] = { ...servers[index] };
      servers[index].isRunning = !servers[index].isRunning;
      servers[index].isRunning
        ? this.startTimer(index)
        : this.stopTimer(currentServer, index);
      this.setState({ servers });
      await updateServer(currentServer, {
        isRunning: servers[index].isRunning,
      });
    } catch (error) {
      this.setState({ servers: originalServers });
      console.log(error);
    }
  };

  handleDelete = async (currentServer) => {
    await this.clearIntervalBeforDelete(currentServer);
    const originalServers = this.state.servers;
    try {
      const servers = originalServers.filter(
        (server) => server._id !== currentServer
      );
      this.setState({ servers });
      await deleteServer(currentServer);
    } catch (error) {
      this.setState({ servers: originalServers });
      console.log(error);
    }
  };

  clearIntervalBeforDelete = async (currentServer) => {
    const originalServers = this.state.servers;
    const servers = [...originalServers];
    const index = servers.findIndex((server) => server._id === currentServer);
    await this.stopTimer(currentServer, index);
  };

  startTimer = (index) => {
    const servers = this.state.servers;
    let server = { ...servers[index] };

    server.timer.start = server.timer.time;
    let start = Date.now();

    intervals[index] = setInterval(() => {
      const servers = this.state.servers;
      let server = { ...servers[index] };

      server.timer.time = server.timer.start + (Date.now() - start);
      if (
        server.type.price <
        serversTypes[server.type.serverTypeIndex].price *
          Math.floor((server.timer.time / (1000 * 60)) % 60)
      ) {
        server.type.price =
          serversTypes[server.type.serverTypeIndex].price *
          Math.floor((server.timer.time / (1000 * 60)) % 60);
      }
      servers[index] = server;
      this.setState({ servers });
    }, 1000);
  };

  stopTimer = async (currentServer, index) => {
    if (intervals[index]) {
      clearInterval(intervals[index]);
      await updateServer(currentServer, {
        timer: this.state.servers[index].timer,
        type: this.state.servers[index].type,
      });
    }
  };

  handleSelectCurrency = (event) => {
    this.setState({ indexCurrencyTypes: event.target.value }, async () => {
      let { name, symbol } = currencyTypes[this.state.indexCurrencyTypes];
      this.setState({ currency: name });
      let { data } = await getConverCurrency(name);
      let converter = Object.values(data)[0];
      this.setState({ converter, converterSymbl: symbol });
    });
  };

  render() {
    const { servers, converter, converterSymbl } = this.state;
    return (
      <div className="app flex ">
        <AddServer handleSubmit={this.handleSubmit} />
        <CurrencyConverter
          handleSelectCurrency={this.handleSelectCurrency}
        ></CurrencyConverter>
        <DataTable
          servers={servers}
          converter={converter}
          converterSymbl={converterSymbl}
          // funcs
          handleUpdate={this.handleUpdate}
          handleDelete={this.handleDelete}
        />
      </div>
    );
  }
}

export default App;
