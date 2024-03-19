import React from "react";
import DataList from "components/Utils/dataList.jsx";
import { Link } from 'react-router-dom';
import constants from "variables/constants";
import axios from 'axios';
import {
  Col,
  Button,
  Container,
  UncontrolledAlert, 
  Row,
} from "reactstrap";

class ListShips extends React.Component {

  //#region Constructor

  constructor(props) {

    super(props);

    //#region Initial State

    this.state = {

      getResponse: [],
      tableLoading: false,

    }


    //#endregion 

    //#region Event Binding

    //#endregion

  }

  render() {

    let tableCollumns = [
      { name: 'Name', size: 35, property: 'name' },
      { name: 'Code', size: 25, property: 'code' },
      { name: 'Length', size: 15, property: 'length' },
      { name: 'Width', size: 15, property: 'width' },
      { name: '', size: 5, property: 'editButton' },
      { name: '', size: 5, property: 'deleteButton' }
    ];

    let tableData = [];

    if (this.state.getResponse) {

      tableData = this.state.getResponse;
      tableData = tableData.map((item) => {

        return {
          ...item, ...
          {

            editButton: <Link to={`/admin/ships/edit?id=${item.id}`} ><Button color="default"><i class="fa-solid fa-pencil"></i></Button></Link>,
            deleteButton: <Button type="button" color="danger" key={item.id} onClick={() => { window.confirm("Are you sure you want to delete this entity?") && this.deleteEntity(item.id) }}><i class="fa-solid fa-trash"></i></Button>

          }

        };

      });

    }

    return (
      <>

        {/* Page content */}
        <Container className="bg-gradient-info pt-6 pageContainer" fluid>

          <Row className="pt-">

            <Col lg="12">

              <div>

                <h1 className="display-1 float-lg-left">Ships</h1>

                <Link to="/admin/ships/add">

                  <Button color="default" className="float-lg-right mt-4 mr-2"><i class="fa-solid fa-plus"></i>  New Ship</Button>

                </Link>

              </div>

            </Col>

          </Row>

          <Row className="pt-5 pb-5">

            <Col lg="12">

              {(this.state.message) &&

                <UncontrolledAlert color="info" fade={true}>
                  <span className="alert-inner--icon">    
                  </span>{" "}
                  <span className="alert-inner--text">
                    <strong>Warning!</strong> {this.state.message}
                  </span>
                </UncontrolledAlert>

              }

              <DataList loading={this.state.tableLoading} tableCollumns={tableCollumns} tableData={tableData} paging={false} />

            </Col>

          </Row>

        </Container>

      </>
    );
  }

  //#region Component Events

  componentDidMount() {

    this.loadData(true);

  }

  //#endregion

  //#region Custom Events

  loadData(firstLoading) {

    this.setState({ tableLoading: true });

    if (!firstLoading)
      this.setState({ tableLoading: false })

    let url = constants.Endpoints.BaseUrl + constants.Endpoints.Ship.Get;

    axios({

      method: 'GET',
      url: url

    }).then((response) => {

      debugger;

      if (response.status !== 200) {

        console.error("An error ocurred " + url, response);
        return;

      }

      var message = '';

      if (response.data.ships.length === 0)
        message = "No data has been found";

      this.setState({ tableLoading: false, getResponse: response.data.ships, message: message });

    })
      .catch((response) => {

        debugger;

        this.setState({ submitLoading: false });
        console.error("An error ocurred " + url, response);

      });

  }

  deleteEntity(entityId) {

    let url = constants.Endpoints.BaseUrl + constants.Endpoints.Ship.Delete + entityId;

    axios({

      method: "DELETE",
      url: url

    }).then((response) => {

      if (response.status !== 200) {

        console.error("An error ocurred " + url, response);
        return;

      }

      this.loadData(false);

    }).catch((response) => {

      console.error("An error ocurred " + url, response);

    });

  }

}

export default ListShips;