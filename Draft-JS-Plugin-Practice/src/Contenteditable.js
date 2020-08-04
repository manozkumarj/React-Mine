import React, { Component } from "react";
import ReactDOM from "react-dom";
import ContentEditable from "react-contenteditable";
import { Table, Button } from "semantic-ui-react";
import "./styles.css";

class Contenteditable extends Component {
  initialState = {
    store: [
      { id: 11, item: "bat", cost: 1 },
      { id: 22, item: "ball", cost: 2 },
      { id: 33, item: "badminton", cost: 3 },
    ],
    row: {
      item: "",
      cost: "",
    },
  };

  state = this.initialState;
  firstEditable = React.createRef();

  addNewRow = () => {
    const { store, row } = this.state;
    const trimSpaces = (string) => {
      return string
        .replace(/&nbsp;/g, "")
        .replace(/&amp;/g, "&")
        .replace(/&gt;/g, ">")
        .replace(/&lt;/g, "<");
    };
    const trimmedRow = {
      ...row,
      item: trimSpaces(row.item),
    };

    row.id = store.length + 1;

    this.setState({
      store: [...store, trimmedRow],
      row: this.initialState.row,
    });

    this.firstEditable.current.focus();
  };

  removeRow = (id) => {
    const { store } = this.state;

    this.setState({
      store: store.filter((item) => id !== item.id),
    });
  };

  disableNewlines = (evt) => {
    const keyCode = evt.keyCode || evt.which;

    if (keyCode === 13) {
      evt.returnValue = false;
      if (evt.preventDefault) evt.preventDefault();
    }
  };

  validateNum = (evt) => {
    const keyCode = evt.keyCode || evt.which;
    const string = String.fromCharCode(keyCode);
    const regex = /[0-9,]|\./;

    if (!regex.test(string)) {
      evt.returnValue = false;
      if (evt.preventDefault) evt.preventDefault();
    }
  };

  pastePlainText = (evt) => {
    evt.preventDefault();

    const text = evt.clipboardData.getData("text/plain");
    document.execCommand("insertHTML", false, text);
  };

  highlightAll = () => {
    setTimeout(() => {
      document.execCommand("selectAll", false, null);
    }, 0);
  };

  handleCE = (evt) => {
    const { row } = this.state;
    const {
      currentTarget: {
        dataset: { column },
      },
      target: { value },
    } = evt;

    this.setState({ row: { ...row, [column]: value } });
  };

  handleCEUpdate = (evt) => {
    const {
      currentTarget: {
        dataset: { row, column },
      },
      target: { value },
    } = evt;

    this.setState(({ store }) => {
      return {
        store: store.map((item) => {
          return item.id === parseInt(row, 10)
            ? { ...item, [column]: value }
            : item;
        }),
      };
    });
  };

  render() {
    const {
      store,
      row: { item, cost },
    } = this.state;

    return (
      <div className="App">
        <h1>React Example With Contenteditable</h1>

        <Table celled>
          <Table.Header>
            <Table.Row>
              <Table.HeaderCell>Item</Table.HeaderCell>
              <Table.HeaderCell>Cost</Table.HeaderCell>
              <Table.HeaderCell>UserAction</Table.HeaderCell>
            </Table.Row>
          </Table.Header>
          <Table.Body>
            {store.map((row, i) => {
              return (
                <Table.Row key={row.id}>
                  <Table.Cell className="narrow">
                    <ContentEditable
                      html={row.item}
                      data-column="item"
                      data-row={i}
                      className="content-editable"
                      onKeyPress={this.disableNewlines}
                      onPaste={this.pastePlainText}
                      onFocus={this.highlightAll}
                      onChange={this.handleCEUpdate}
                    />
                  </Table.Cell>
                  <Table.Cell className="narrow">
                    <ContentEditable
                      html={row.cost.toString()}
                      data-column="cost"
                      data-row={i}
                      className="content-editable"
                      onKeyPress={this.validateNum}
                      onPaste={this.pastePlainText}
                      onFocus={this.highlightAll}
                      onChange={this.handleCEUpdate}
                    />
                  </Table.Cell>
                  <Table.Cell className="narrow">
                    <Button
                      onClick={() => {
                        this.removeRow(row.id);
                      }}
                    >
                      Delete
                    </Button>
                  </Table.Cell>
                </Table.Row>
              );
            })}
            <Table.Row>
              <Table.Cell className="narrow">
                <ContentEditable
                  html={item}
                  data-column="item"
                  className="content-editable"
                  innerRef={this.firstEditable}
                  onKeyPress={this.disableNewlines}
                  onPaste={this.pastePlainText}
                  onFocus={this.highlightAll}
                  onChange={this.handleCE}
                />
              </Table.Cell>
              <Table.Cell className="narrow">
                <ContentEditable
                  html={cost}
                  data-column="cost"
                  className="content-editable"
                  onKeyPress={this.validateNum}
                  onPaste={this.pastePlainText}
                  onFocus={this.highlightAll}
                  onChange={this.handleCE}
                />
              </Table.Cell>
              <Table.Cell className="narrow">
                <Button disabled={!item || !cost} onClick={this.addNewRow}>
                  Add
                </Button>
              </Table.Cell>
            </Table.Row>
          </Table.Body>
        </Table>
      </div>
    );
  }
}

export default Contenteditable;
