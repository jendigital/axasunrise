import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { connect } from 'react-redux';
import Tabs, { Tab } from 'react-awesome-tabs';
import joint, { V, g } from 'jointjs/index';
import $ from 'jquery';
import _ from 'lodash';
import MainLayout from '../../layouts/default';

import './index.css';
import '../../assets/style/jointjs.css';
import 'react-awesome-tabs/dist/react-awesome-tabs.css'

import { modelActions } from '../../../actions';
import { models } from '../../../utils/models.js'
import { link } from 'fs';
import { currentTab } from '../../../utils/currenttab';

class TabList extends Component {
	constructor(props) {
		super(props);

		let modelsToOpen = models();
		if(modelsToOpen.length !== 0) {
			let activeTab = modelsToOpen.findIndex(model => model.id === currentTab()) ||  0;                             
			this.state = {
				activeTab: activeTab,
				tabs : modelsToOpen,
			};
			this.props.dispatch(modelActions.get(modelsToOpen[activeTab].id));
		} else {
			this.state = {
				activeTab: 0,
				tabs: [{
					title: 'modeling',
					type: 'model',
					content: ''
				}]
			}
		}
		this.graph = new joint.dia.Graph();
	}

	componentDidMount() {
		if(this.state.tabs[this.state.activeTab].type === 'model') {
			this.paper = new joint.dia.Paper({
				el: ReactDOM.findDOMNode(this.refs.model),
				width: 1500,
				height: 815,
				model: this.graph,
			});
			
			joint.shapes.html = {};
			joint.shapes.html.Element = joint.shapes.basic.Rect.extend({
				defaults: joint.util.deepSupplement({
					type: 'html.Element',
					attrs: {
						rect: { stroke: 'none', 'fill-opacity': 0 }
					}
				}, joint.shapes.basic.Rect.prototype.defaults)
			});

			joint.shapes.html.ElementView = joint.dia.ElementView.extend({
				initialize: function() {
					_.bindAll(this, 'updateBox');
					joint.dia.ElementView.prototype.initialize.apply(this, arguments);
		
					let boxMarkup = joint.util.template(this.model.get('template'))();
					let $box = this.$box = $(boxMarkup);
					// Prevent paper from handling pointerdown.
					// this.$box.find('input,select').on('mousedown click', function(evt) {
					// 	evt.stopPropagation();
					// });

					this.$box.find('.test').on('click', _.bind(function(evt) {
						console.log('test')
						// window.location.href = '/';
					}, this));
					// This is an example of reacting on the input change and storing the input data in the cell model.
					// this.$box.find('input').on('change', _.bind(function(evt) {
					// 	this.model.set('input', $(evt.target).val());
					// }, this));
					// this.$box.find('select').on('change', _.bind(function(evt) {
					// 	this.model.set('select', $(evt.target).val());
					// }, this));
					// this.$box.find('select').val(this.model.get('select'));
					this.$box.find('.delete').on('click', _.bind(this.model.remove, this.model));
					// Update the box position whenever the underlying model changes.
					this.model.on('change', this.updateBox, this);
					// Remove the box when the model gets removed from the graph.
					this.model.on('remove', this.removeBox, this);
					this.updateBox();
				},
				render: function() {
					joint.dia.ElementView.prototype.render.apply(this, arguments);
					this.paper.$el.prepend(this.$box);
					this.updateBox();
					return this;
				},
				updateBox: function() {
					// Set the position and dimension of the box so that it covers the JointJS element.
					let bbox = this.model.getBBox();
					// Example of updating the HTML with a data stored in the cell model.
					this.$box.find('.name').text(this.model.get('label'));
					// this.$box.find('span').text(this.model.get('select'));
					this.$box.css({
						width: bbox.width,
						height: bbox.height,
						left: bbox.x,
						top: bbox.y,
						transform: 'rotate(' + (this.model.get('angle') || 0) + 'deg)'
					});
				},
				removeBox: function(evt) {
					this.$box.remove();
				}
			});
		}
	}

	componentDidUpdate(prevProps) {
		// Typical usage (don't forget to compare props):
		if (this.props.models !== prevProps.models && this.state.tabs[this.state.activeTab].type === 'model') {
			this.props.models && this.props.models.datas.map(data => {
				let template = [
					'<div class="html-element data">',
					'<label class="name"></label>'
				]
				data.attributes && data.attributes.map( attribute => {
					template.push('<label class="attribute">' + attribute.name + '</label>');
				})
				template.push('</div>')
				let dataElt = new joint.shapes.html.Element({
					id: data.id,
					position: { x: data.x, y: data.y },
					size: { width: data.width === -1 ? 100 : data.width, height: data.height === -1 ? 70 : data.height },
					label: data.name,
					template: template.join(''),
					// select: 'one'
				});

				this.graph.addCells([dataElt]);
			})

			this.props.models && this.props.models.outputs.map(output => {
				let template = [
					'<div class="html-element output">',
					'<label class="name"></label>'
				]
				output.attributes && output.attributes.map( attribute => {
					template.push('<label class="attribute">' + attribute.name + '</label>')
				})
				template.push('</div>')
				let outputElt = new joint.shapes.html.Element({
					id: output.id,
					position: { x: output.x, y: output.y },
					size: { width: output.width, height: output.height },
					label: output.name,
					template: template.join(''),
					// select: 'one'
				});

				this.graph.addCells([outputElt]);
			})

			this.props.models && this.props.models.services.map(service => {
				let template = [
					'<div class="html-element service">',
					'<label class="name"></label>'
				]
				if(service.attributes && service.attributes.length > 0) {
					template.push('<label class="property-header">Attributes</label>');
				}
				service.attributes && service.attributes.map( attribute => {
					template.push('<label class="attribute">' + attribute.name + '</label>')
				})
				if(service.functions && service.functions.length > 0) {
					template.push('<label class="property-header">Functions</label>');
				}
				service.functions && service.functions.map( functions => {
					template.push('<label class="function">' + functions.name + '</label>')
				})
				template.push('</div>')
				let serviceElt = new joint.shapes.html.Element({
					id: service.id,
					position: { x: service.x, y: service.y },
					size: { width: service.width, height: service.height },
					label: service.name,
					template: template.join(''),
					// select: 'one'
				});

				this.graph.addCells([serviceElt]);
			})

			this.props.models && this.props.models.events.map(event => {
				let eventAttributes = event.attributes && event.attributes.map( attribute => {
					return('<label class="attribute">' + attribute.name + '</label>')
				})
				let template = [
					'<div class="html-element event">',
					'<label class="name"></label>'
				]
				for(let i=0; i<eventAttributes.length; i++){
					template.push(eventAttributes[i]);
				}
				template.push('</div>')
				let eventElt = new joint.shapes.html.Element({
					id: event.id,
					position: { x: event.x, y: event.y },
					size: { width: event.width, height: event.height },
					label: event.name,
					template: template.join(''),
					// select: 'one'
				});

				this.graph.addCells([eventElt]);
			})

			this.props.models && this.props.models.dataLinks.map(dataLink => {
				let l = new joint.dia.Link({
					source: { id: dataLink.childId },
					target: { id: dataLink.parentId },
					distance: 60,
					attrs: { '.connection': { 'stroke-width': 1, stroke: '#DCDCDC', strokeDasharray: '5' } }
				});
				this.graph.addCells([l]);
			})

			this.props.models && this.props.models.eventLinks.map(eventLink => {
				let l = new joint.dia.Link({
					source: { id: eventLink.dataId },
					target: { id: eventLink.eventId },
					attrs: { '.connection': { 'stroke-width': 1, stroke: '#DCDCDC', strokeDasharray: '5' } }
				});
				this.graph.addCells([l]);
			})

			this.props.models && this.props.models.outputLinks.map(outputLink => {
				let l = new joint.dia.Link({
					source: { id: outputLink.dataId },
					target: { id: outputLink.outputId },
					attrs: { 
						'.connection': { 
							'stroke-width': 1, 
							stroke: '#DCDCDC',
							strokeDasharray: '5',
						}
					}
				});
				this.graph.addCells([l]);
			})
		}
	}

	handleTabSwitch(active) {
		this.setState({ activeTab: active });
		localStorage.setItem('currentTab', this.state.tabs[active].id);
		if(this.state.tabs[active].type === 'model') {
			this.props.dispatch(modelActions.get(this.state.tabs[active].id));
			this.graph.clear();
		}
		
	}

	handleTabPositionChange(a, b) {
		let tempTab = this.state.tabs;
		let buffer = tempTab[a];
		tempTab[a] = tempTab[b];
		tempTab[b] = buffer;
		this.setState({
			tabs: tempTab
		})
		console.log(tempTab)
		localStorage.setItem('models', JSON.stringify(tempTab))

		if(this.state.activeTab === a) {
			this.setState({ activeTab: b });
			localStorage.setItem('currentTab', this.state.tabs[b].id);
			if(this.state.tabs[b].type === 'model') {
				this.props.dispatch(modelActions.get(this.state.tabs[b].id));
				this.graph.clear();
			}
		} else if(this.state.activeTab === b) {
			this.setState({ activeTab: a });
			localStorage.setItem('currentTab', this.state.tabs[a].id);
			if(this.state.tabs[a].type === 'model') {
				this.props.dispatch(modelActions.get(this.state.tabs[a].id));
				this.graph.clear();
			}
		}

		this.forceUpdate()
	}

	handleTabClose(index) {
		this.state.tabs.splice(index, 1);

		if(this.state.activeTab >= this.state.tabs.length) {
			this.setState({ 
				activeTab: this.state.tabs.length - 1
			});
			localStorage.setItem('currentTab', (this.state.tabs.length - 1));
		}

		this.forceUpdate();
	}

	handleTabAdd() {
		const tab_temp = this.state.tabs;
		tab_temp.push({
			title: 'New Tab',
			content: 'Hey Buddy!'
		});

		this.setState({
			activeTab: this.state.tabs.length - 1,
			tabs: tab_temp
		});
    }

    render() {
        const options = {
            selectOnLineNumbers: true
		};
		const { user, models } = this.props;

        return (
            <MainLayout active={'tablist'} section_active={'notmanagement'} section_name='modeling' section_info={models} >
                <div id='tablist'>
                    <Tabs
                        active={ this.state.activeTab }
                        onTabSwitch={ this.handleTabSwitch.bind(this) }
                        onTabPositionChange={ this.handleTabPositionChange.bind(this) }
                        onTabClose={ this.handleTabClose.bind(this) }
                        draggable={ true }
                    >
                    {
                        this.state.tabs.map((tab, index) => {
                            return (
                                <Tab 
                                    key={ index } 
                                    title={ tab.title }
									showClose={ true }
                                >
									
                                </Tab>
                            );
                        })
                    }
                    </Tabs>
					{
						
						<div className='model' ref='model'>
					
						</div>
					}
					
                </div>
            </MainLayout>
        )
    }
}

function mapStateToProps(state) {
    const { models, auth } = state;
    const { user } = auth;

    return {
        user,
        models: models.data
    };
}

export default connect(mapStateToProps)(TabList)
