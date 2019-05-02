import React, { Component } from 'react';
import Modal from 'react-modal';
import Back from '../../../../assets/img/back.png'
import Folder from '../../../../assets/img/folder.png'
import File from '../../../../assets/img/file.png'
import { fileManager } from '../../../../../utils';

const customStyles = {
    content : {
        top                   : '50%',
        left                  : '50%',
        right                 : 'auto',
        bottom                : 'auto',
        marginRight           : '-50%',
        transform             : 'translate(-50%, -50%)'
    }
};

Modal.setAppElement('#app')

const configDirectory = fileManager();

export default class SelectScenarioFile extends Component {
    constructor(props) {
        super(props);

        this.state = {
            selectScenarioFile: false,
            scenarioFile: '',
            listOfElement: null,
            path: '/',
            previouspath: '/',
            previousbackpath: '/',
        };

        configDirectory.getDirectoryContents(this.state.path).then((elements) => {
            this.setState({
                listOfElement: elements
            })
        })
    
        this.selectScenarioFile = this.selectScenarioFile.bind(this);
        this.closeSelectScenarioFile = this.closeSelectScenarioFile.bind(this);
        this.onChange = this.onChange.bind(this);
        this.onBackWorkingDirectory = this.onBackWorkingDirectory.bind(this);
        this.onSelectWorkingDirectory = this.onSelectWorkingDirectory.bind(this);
        this.onSelectParamerFile = this.onSelectParamerFile.bind(this);
    }

    selectScenarioFile() {
        this.setState({selectScenarioFile: true});
    }

    closeSelectScenarioFile() {
        this.setState({selectScenarioFile: false});
        this.props.chooseScenarioFile(this.state.scenarioFile);
    }

    onChange(event) {
        const target = event.target;
        const value = target.value;
        const name = target.name;
        
        this.setState({
            [name]: value
        });
    }

    onSelectWorkingDirectory(path) {
        this.setState({
            previouspath: this.state.path,
            previousbackpath: this.state.previouspath,
            path: path
        })

        configDirectory.getDirectoryContents(path).then((elements) => {
            this.setState({
                listOfElement: elements
            })
        })
    }

    onBackWorkingDirectory(event) {
        this.setState({
            previouspath: this.state.previousbackpath,
            path: this.state.previouspath,
            scenarioFile: ''
        })

        configDirectory.getDirectoryContents(this.state.previouspath).then((elements) => {
            this.setState({
                listOfElement: elements
            })
        })
    }

    onSelectParamerFile(file) {
        this.setState({
            scenarioFile: file
        })
    }

    render() {
        const listOfElement = this.state.listOfElement && this.state.listOfElement.map((element, index)=> {
            if(element.type === 'directory') {
                return <div className='folder' key={'filename' + index} onClick={() => this.onSelectWorkingDirectory(element.filename)}><img alt='folder' src={Folder} /> { element.basename }</div>
            } else {
                return <div className='file' key={'filename' + index}  onClick={() => this.onSelectParamerFile(element.filename)}><img alt='file' src={File} /> { element.basename }</div>
            }
        })
        return (
            <div id='selectScenarioFile' className='selectFile'>
                <input id='scenarioFile' name='scenarioFile' value={ this.state.scenarioFile } onClick={ this.selectScenarioFile } onChange={ this.onChange } type='text' />
                <select>
                    <option value='comma'>,</option>
                    <option value='semi-colon'>;</option>
                    <option value='tab'>TAB</option>
                    <option value='colon'>:</option>
                    <option value='pipe'>|</option>
                    <option value='hash'>#</option>
                    <option value='space'>SPACE</option>
                </select>
                <select>
                    <option value='comma'>True</option>
                    <option value='semi-colon'>False</option>
                </select>
                <Modal
                    isOpen={this.state.selectScenarioFile}
                    onRequestClose={this.closeSelectScenarioFile}
                    style={customStyles}
                    contentLabel="Working Directory"
                >
                    <div className='modal-container'>
                        <div className='modal-title'>
                            Scenario Mapping File <span className='close' onClick={ this.closeSelectScenarioFile }>X</span>
                        </div>
                        <div>Choose scenario mapping file *</div>
                        <div className='explorer'>
                            { this.state.path !== '/' && <div className='back' onClick={ this.onBackWorkingDirectory }> <img alt='back' src={Back} /> Back </div> }
                            <div className='list'> { listOfElement } </div>
                        </div>
                        <div>Choosen file: {this.state.scenarioFile}</div>
                        <div className='submit' onClick={ this.closeSelectScenarioFile }> Select </div>
                    </div>
                </Modal>
            </div>
        );
    }
}
