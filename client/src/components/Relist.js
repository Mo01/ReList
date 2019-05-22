import React, { Component } from 'react';
import {
	Container,
	ListGroup,
	ListGroupItem,
	Button,
	Row,
	Col,
	Modal,
	ModalHeader,
	ModalBody,
	Form,
	FormGroup,
	Label,
	Input
} from 'reactstrap';
import { CSSTransition, TransitionGroup } from 'react-transition-group';
import { connect } from 'react-redux';
import { getItems, deleteItem, updateItem } from '../actions/itemActions';
import PropTypes from 'prop-types';
import Moment from 'react-moment';

class Relist extends Component {
	static propTypes = {
		getItems: PropTypes.func.isRequired,
		item: PropTypes.object.isRequired,
		isAuthenticated: PropTypes.bool
	};
	state = {
		modal: false,
		name: '',
		complete: 1
	};
	currentId = '';

	componentDidMount() {
		this.props.getItems();
	}

	onDeleteClick = (id) => {
		this.props.deleteItem(id);
	};
	toggle = (id, name, complete) => {
		console.log('Mo!!', id, name, complete);
		this.setState({
			modal: !this.state.modal,
			name: name,
			complete: this.state.complete
		});
		this.currentId = id;
	};

	// toggleCheck = () => {
	// 	console.log('Mo!!', this.state.complete);
	// 	this.setState({
	// 		complete: !this.state.complete
	// 	});
	// };

	onChange = (e) => {
		this.setState({ [e.target.name]: e.target.value });
	};

	onSubmit = (e) => {
		e.preventDefault();

		const newItem = {
			name: this.state.name,
			complete: this.state.complete
		};

		console.log('Mo, updating with', this.currentId, newItem);
		// Add item via addItem action
		this.props.updateItem(this.currentId, newItem);

		// Close modal
		this.toggle();
	};

	render() {
		const { items } = this.props.item;
		return (
			<Container>
				<ListGroup>
					<TransitionGroup className="list-list">
						{items.map(({ _id, name, date }) => (
							<CSSTransition key={_id} timeout={500} classNames="fade">
								<ListGroupItem>
									{this.props.isAuthenticated ? (
										<Form inline>
											<FormGroup className="mb-12 mr-sm-12 mb-sm-12">
												<Button
													className="remove-btn"
													color="danger"
													size="sm"
													onClick={this.onDeleteClick.bind(this, _id)}
												>
													&times;
												</Button>
												<Button
													outline
													color="info"
													size="sm"
													onClick={this.toggle.bind(this, _id, name)}
												>
													Edit
												</Button>

												<Label check>
													<Input type="checkbox" onChange={this.toggleCheck} />
												</Label>

												{name}

												<Moment format="YYYY/MM/DD HH:mm">{date}</Moment>
											</FormGroup>
										</Form>
									) : (
										<Row>
											<Col xs="6">{name}</Col>
											<Col xs="5">
												<Moment format="YYYY/MM/DD HH:mm">{date}</Moment>
											</Col>
										</Row>
									)}
								</ListGroupItem>
							</CSSTransition>
						))}
					</TransitionGroup>
				</ListGroup>
				{/* update item */}
				<Modal isOpen={this.state.modal} toggle={this.toggle}>
					<ModalHeader toggle={this.toggle}>Update item</ModalHeader>
					<ModalBody>
						<Form onSubmit={this.onSubmit}>
							<FormGroup>
								<Label for="item">Item</Label>
								<Input
									type="text"
									name="name"
									id="item"
									defaultValue={this.state.name}
									onChange={this.onChange}
								/>
								<Button color="info" style={{ marginTop: '2rem' }} block>
									Update
								</Button>
							</FormGroup>
						</Form>
					</ModalBody>
				</Modal>
			</Container>
		);
	}
}

const mapStateToProps = (state) => ({
	item: state.item,
	isAuthenticated: state.auth.isAuthenticated
});

export default connect(mapStateToProps, { getItems, deleteItem, updateItem })(Relist);
