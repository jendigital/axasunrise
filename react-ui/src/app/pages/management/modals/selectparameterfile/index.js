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

export default class SelectParameterFile extends Component {
    constructor(props) {
        super(props);

        this.state = {
            selectParameterFile: false,
            parameterFile: '',
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
    
        this.selectParameterFile = this.selectParameterFile.bind(this);
        this.closeSelectParameterFile = this.closeSelectParameterFile.bind(this);
        this.onChange = this.onChange.bind(this);
        this.onBackWorkingDirectory = this.onBackWorkingDirectory.bind(this);
        this.onSelectWorkingDirectory = this.onSelectWorkingDirectory.bind(this);
        this.onSelectParamerFile = this.onSelectParamerFile.bind(this);
    }

    selectParameterFile() {
        this.setState({selectParameterFile: true});
    }

    closeSelectParameterFile() {
        this.setState({selectParameterFile: false});
        this.props.chooseParameterFile(this.state.parameterFile);
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
            parameterFile: ''
        })

        configDirectory.getDirectoryContents(this.state.previouspath).then((elements) => {
            this.setState({
                listOfElement: elements
            })
        })
    }

    onSelectParamerFile(file) {
        this.setState({
            parameterFile: file
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
            <div id='selectParameterFile' className='selectFile'>
                <input id='parameterFile' name='parameterFile' value={ this.state.parameterFile } onClick={ this.selectParameterFile } onChange={ this.onChange } type='text' />
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
                    <option value='comma'>MODEL</option>
                    <option value='semi-colon'>USER</option>
                </select>
                <Modal
                    isOpen={this.state.selectParameterFile}
                    onRequestClose={this.closeSelectParameterFile}
                    style={customStyles}
                    contentLabel="Working Directory"
                >
                    <div className='modal-container'>
                        <div className='modal-title'>
                            Parameter Level File <span className='close' onClick={ this.closeSelectParameterFile }>X</span>
                        </div>
                        <div>Choose parameter level file *</div>
                        <div className='explorer'>
                            { this.state.path !== '/' && <div className='back' onClick={ this.onBackWorkingDirectory }> <img alt='back' src={Back} /> Back </div> }
                            <div className='list'> { listOfElement } </div>
                        </div>
                        <div>Choosen file: {this.state.parameterFile}</div>
                        <div className='submit' onClick={ this.closeSelectParameterFile }> Select </div>
                    </div>
                </Modal>
            </div>
        );
    }
}
