//#region Imports

import Modal from 'react-modal';
import axios from 'axios';
import React from "react";
import constants from "variables/constants";
import { formater } from 'components/Utils/formater';
import Loading from 'components/Utils/loading.jsx';
import { Link } from 'react-router-dom';
import {
    Container,
    Row,
    Col,
    Form,
    Button
} from "reactstrap";


//#endregion


class EditShip extends React.Component {

    //#region Constructor

    constructor(props) {

        super(props);

        //#region Initial State

        this.state = {

            entityId: "",
            submitLoading: false,
            formData: {},
            initalName: ''

        }


        //#endregion 

        //#region Event Binding

        this.onInputChange = this.onInputChange.bind(this);

        //#endregion

    }

    render() {

        return (

            <>

                <Container className="bg-gradient-info pt-6 pageContainer" fluid>

                    <Row className="pt-4">

                        <Col lg="6">
                            <div>
                                {this.state.initalTitle ?
                                    <h1 className="display-1">{"Editing: " + this.state.initalTitle}</h1>
                                    :
                                    <h1 className="display-1">New Ship</h1>
                                }

                            </div>
                        </Col>

                    </Row>

                    <Form>

                        <Row lg="12" className="pt-7">

                            <Col lg="12">
                                <div className="form-group">
                                    <label className="text-family font-weight-900 pb-1">Name</label>
                                    <input type="name" className="form-control text-dark font-weight-900 mt--2" id="name" name="name" ref="name" value={this.state.formData['name']} placeholder="" onChange={this.onInputChange} />
                                </div>
                            </Col>

                        </Row>

                        <Row lg="12" className="">

                            <Col lg="6">
                                <div className="form-group">
                                    <label className="text-family font-weight-900 pb-1">Code</label>
                                    <input type="name" className="form-control text-dark font-weight-900 mt--2" id="code" name="code" ref="code" value={this.state.formData['code']} placeholder="AAAA-1111-A1" onChange={this.onInputChange} />
                                </div>
                            </Col>
                            <Col lg="3">
                                <div className="form-group">
                                    <label className="text-family font-weight-900 pb-1">Width (meters)</label>
                                    <input type="name" className="form-control text-dark font-weight-900 mt--2" id="width" name="width" value={this.state.formData['width']} placeholder="" onChange={this.onInputChange} />
                                </div>
                            </Col>
                            <Col lg="3">
                                <div className="form-group">
                                    <label className="text-family font-weight-900 pb-1">Length (meters)</label>
                                    <input type="name" className="form-control text-dark font-weight-900 mt--2" id="length" name="length" value={this.state.formData['length']} placeholder="" onChange={this.onInputChange} />
                                </div>
                            </Col>

                        </Row>

                    </Form>

                    <div className="container-fluid pb-6 mt-2">

                        <Row>

                            <Col>

                                <div className="float-lg-right">

                                    <Button color="primary" className="ml-4" onClick={() => { this.handleSubmit(); }}>

                                 

                                        {this.state.submitLoading ?
                                            <Loading load={true} /> :
                                            <>   <i class="fa-solid fa-floppy-disk"></i> Save</>
                                        }

                                    </Button>

                                    <Link to={"/admin/Ships"}> <Button color="default" type="reset" onClick={this.clearFormState}><i class="fa-solid fa-arrow-left"></i> Back</Button></Link>

                                </div>

                            </Col>

                        </Row>

                    </div>

                </Container>

            </>

        );

    }

    //#region Component Events

    componentDidMount() {

        let urlString = window.location.href;
        let id = (new URL(urlString)).searchParams.get("id");

        if (id) {

            let url = constants.Endpoints.BaseUrl + constants.Endpoints.Ship.Get + id;

            axios({

                method: 'GET',
                url: url

            }).then((response) => {

                let formData = { ...this.state.formData, ...response.data };
                formData.id = id;
                this.setState({ formData: formData, entityId: id, initalTitle: response.data.name });

            }).catch(() => {

                window.location.href = "/admin/ships";

            });

        }

    }

    //#endregion

    //#region Custom Events


    onInputChange(event) {

        const target = event.target;
        const name = target.id;
        let value = '';

        if (target.type === 'checkbox') {

            value = target.checked;

        } else {

            switch (name) {

                case 'code':
                    value = formater.template(target.value, 'AAAA-0000-A0');
                    break;

                case 'name':
                    value = formater.maxLength(target.value, 150);
                    break;

                case 'width':
                    value = formater.number(target.value);
                    break;

                case 'length':
                    value = formater.number(target.value);
                    break;

                default:
                    value = target.value;

            }

        }

        this.setState({

            formData: Object.assign(this.state.formData, { [name]: value })

        });

    }

    handleSubmit() {

        this.setState({ submitLoading: true });
        let url = constants.Endpoints.BaseUrl + constants.Endpoints.Ship.Post;
        let method = (this.state.entityId ? "PUT" : "POST");

        axios({

            method: method,
            url: url,
            data: this.state.formData

        }).then((response) => {

            this.setState({ submitLoading: false });

            if (response.status !== 200) {

                console.error("An error ocurred " + url, response);
                return;

            }

            window.location.href = "/admin/ships";

        }).catch((response) => {

            this.setState({ submitLoading: false });
            console.error("An error ocurred " + url, response);

        });

    }

}

export default EditShip;