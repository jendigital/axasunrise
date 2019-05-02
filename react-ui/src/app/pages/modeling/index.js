import React, { Component } from 'react';
import Tabs, { Tab } from 'react-awesome-tabs';

import MainLayout from '../../layouts/default';

import './index.css';
import 'react-awesome-tabs/dist/react-awesome-tabs.css'

export default class Modeling extends Component {
	tabs = [];

	handleTabSwitch(active) {
		this.setState({ activeTab: active });
	}

	handleTabPositionChange(a, b) {
		let c = this.tabs[a];
		this.tabs[a] = this.tabs[b];
		this.tabs[b] = c;

		if(this.state.activeTab === a) {
			this.setState({ activeTab: b });
		} else if(this.state.activeTab === b) {
			this.setState({ activeTab: a });
		}

		this.forceUpdate()
	}

	handleTabClose(index) {
		this.tabs.splice(index, 1);

		if(this.state.activeTab >= this.tabs.length) {
			this.setState({ activeTab: this.tabs.length - 1 });
		}

		this.forceUpdate();
	}

	handleTabAdd() {
		this.tabs.push({
			title: 'New Tab',
			content: 'Hey Buddy!'
		});

		this.setState({
			activeTab: this.tabs.length - 1
		});
    }

	constructor(props) {
		super(props);
		this.state = {
            activeTab: 0,
		};

		this.tabs = [
			{
				title: 'Model1',
				content: ''
			},
			{
				title: 'Model2',
				content: ''
			},
			{

				title: 'Model3',
				content: ''
			},
		];
    }

    render() {
        const code = this.state.code;
        const options = {
            selectOnLineNumbers: true
        };
        return (
            <MainLayout active={'modeling'} section_active={'notmanagement'}>
                <div id='modeling'>
                    <Tabs
                        active={ this.state.activeTab }
                        onTabSwitch={ this.handleTabSwitch.bind(this) }
                        onTabPositionChange={ this.handleTabPositionChange.bind(this) }
                        onTabClose={ this.handleTabClose.bind(this) }
                        draggable={ true }
                    >
                    {
                        this.tabs.map((value, index) => {
                            return (
                                <Tab 
                                    key={ index } 
                                    title={ value.title }
                                    showClose={ true }
                                >

                                </Tab>
                            );
                        })
                    }
                    </Tabs>
                </div>
            </MainLayout>
        )
    }
}
