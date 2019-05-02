import React, { Component } from 'react';
import { Link } from 'react-router-dom';

import './index.css';

import Glass from '../../../../assets/img/glass.png';
import Eye from '../../../../assets/img/eye.png';
import Group from '../../../../assets/img/group.png';
import User from '../../../../assets/img/user.png';

class Menu extends Component {
    render() {
        const datasources = this.props.section_info && this.props.section_info.datasources && this.props.section_info.datasources.map((datasource, index) => {
            return (
                <div key={'datasource' + index} className='element'>
                    {datasource.name}
                </div>
            )
        })
        const assumptions = this.props.section_info && this.props.section_info.assumptions && this.props.section_info.assumptions.map((assumption, index) => {
            return (
                <div key={'assumption' + index} className='element'>
                    {assumption.name}
                </div>
            )
        })
        const scenarios = this.props.section_info && this.props.section_info.scenarios && this.props.section_info.scenarios.map((scenario, index) => {
            return (
                <div key={'scenario' + index} className='element'>
                    {scenario.name}
                </div>
            )
        })
        const datas = this.props.section_info && this.props.section_info.datas && this.props.section_info.datas.map((data, index) => {
            return (
                <div key={'data' + index} className='element'>
                    {data.name}
                </div>
            )
        })
        const events = this.props.section_info && this.props.section_info.events && this.props.section_info.events.map((event, index) => {
            return (
                <div key={'event' + index} className='subelement'>
                    {event.name}
                </div>
            )
        })
        const outputs = this.props.section_info && this.props.section_info.outputs && this.props.section_info.outputs.map((output, index) => {
            return (
                <div key={'output' + index} className='element'>
                    {output.name}
                </div>
            )
        })
        const services = this.props.section_info && this.props.section_info.services && this.props.section_info.services.map((service, index) => {
            const functions = service.functions && service.functions.map((funct, index) => {
                return(
                    <div key={'function' + index} className='subelement'>
                        {funct.name}
                    </div>
                )
            })

            return (
                <div key={'service' + index}>
                    <div className='element'>
                        {service.name}
                    </div>
                    {functions}
                </div>
            )
        })
        const sequencers = this.props.section_info && this.props.section_info.eventSequencers && this.props.section_info.eventSequencers.map((sequencer, index) => {
            return (
                <div key={'sequencer' + index} className='element'>
                    {sequencer.name}
                </div>
            )
        })
        const loaders = this.props.section_info && this.props.section_info.dataLoaders && this.props.section_info.dataLoaders.map((loader, index) => {
            return (
                <div key={'loader' + index} className='element'>
                    {loader.name}
                </div>
            )
        })

        var date = new Date(this.props.section_info && this.props.section_info.creationAuditInfo
            && this.props.section_info.creationAuditInfo.date);
        var creationdate = date.toLocaleDateString('fr-FR') + ' ' +  date.toLocaleTimeString('fr-FR');
        
        return (
            <div className='menu'>
                { 
                    this.props.active !== 'notmanagement' &&
                    <Link to='/management/model'>
                        <div className={this.props.active === 'model' ? 'tabs active' : 'tabs'}>
                            <img  alt='model' src={Glass} /> <span className='menutxt'>Model</span>
                        </div>
                    </Link>
                }
                {
                    this.props.right === 'ADMIN' && this.props.active !== 'notmanagement' &&
                    <Link to='/management/groups'>
                        <div className={this.props.active === 'groups' ? 'tabs active' : 'tabs'}>
                            <img  alt='groups' src={Group} /> <span className='menutxt'>Groups</span>
                        </div>
                    </Link>
                }
                {
                    this.props.right === 'ADMIN' && this.props.active !== 'notmanagement' &&
                    <Link to='/management/users'>
                        <div className={this.props.active === 'users' ? 'tabs active' : 'tabs'}>
                            <img  alt='users' src={User} /> <span className='menutxt'>Users</span>
                        </div>
                    </Link>
                }
                {
                    this.props.right === 'ADMIN' && this.props.active !== 'notmanagement' &&
                    <Link to='/management/authorizations'>
                        <div className={this.props.active === 'authorisation' ? 'tabs active' : 'tabs'}>
                            <img  alt='authorisation' src={Eye} /> <span className='menutxt'>Authorisation</span>
                        </div>
                    </Link>
                }
                {
                    this.props.section_name === 'modeling' &&
                    <div className='tree'>
                        <div className='tabs side-header'>Model Explorer</div>
                        <div className='tabs active'>{(this.props.section_info && !Array.isArray(this.props.section_info) && this.props.section_info.name) || 'Model_Name'}</div>
                        <div className='tree-content'>
                            <div className='tabs tab-header'>Inputs</div>
                            {datasources}
                            {assumptions}
                            {scenarios}
                            <div  className='tabs tab-header'>Model</div>
                            {datas}
                            {events}
                            <div className='tabs tab-header'>Outputs</div>
                            {outputs}
                            <div className='tabs tab-header'>Services</div>
                            {services}
                            <div className='tabs tab-header'>Projection</div>
                            {sequencers}
                            {loaders}
                        </div>
                    </div>
                }
                {
                    this.props.section_name === 'modeling' &&
                    <div className='properties'>
                        <div className='tabs side-header'>Properties</div>
                        <div className='tabs active'>Property/Value</div>
                        <div className='tree-content'>
                            <div className='tabs tab-header'>Properties</div>
                            <div className='tabs'>
                                Parameter Level Files {this.props.section_info && this.props.section_info.parameterLevelFileConfigs
                                && this.props.section_info.parameterLevelFileConfigs[0].path.url}
                            </div>
                            <div className='tabs'>
                                Scenario Mapping Files {this.props.section_info && this.props.section_info.scenariosHeaderMappingFileConfig
                                && this.props.section_info.scenariosHeaderMappingFileConfig.path.url}
                            </div>
                            <div className='tabs'>
                                Working Dir {this.props.section_info && this.props.section_info.workingDirectory
                                && this.props.section_info.workingDirectory.url}
                            </div>
                            <div className='tabs tab-header'>Update element</div>
                            <div className='tabs'>
                                Created By {this.props.section_info && this.props.section_info.creationAuditInfo
                                && this.props.section_info.creationAuditInfo.author}
                            </div>
                            <div className='tabs'>
                                Creation Date {creationdate}
                            </div>
                            <div className='tabs tab-header'>User Specific</div>
                            <div className='tabs'>
                                Edit Level INVALID
                            </div>
                        </div>
                    </div>
                }
            </div>
        );
    }
}

export default Menu;
