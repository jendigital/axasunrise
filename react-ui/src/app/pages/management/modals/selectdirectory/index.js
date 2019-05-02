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

export default class SelectDirectory extends Component {
    constructor(props) {
        super(props);

        this.state = {
            selectDirectory: false,
            workingDirectory: '/',
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
    
        this.selectDirectory = this.selectDirectory.bind(this);
        this.closeSelectDirectory = this.closeSelectDirectory.bind(this);
        this.onChange = this.onChange.bind(this);
        this.onBackWorkingDirectory = this.onBackWorkingDirectory.bind(this);
        this.onSelectWorkingDirectory = this.onSelectWorkingDirectory.bind(this);
    }

    selectDirectory() {
        this.setState({selectDirectory: true});
    }

    closeSelectDirectory() {
        this.setState({selectDirectory: false});
        this.props.chooseDirectory(this.state.parameterFile);
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
            path: path,
            workingDirectory: path
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
            workingDirectory: this.state.previouspath
        })

        configDirectory.getDirectoryContents(this.state.previouspath).then((elements) => {
            this.setState({
                listOfElement: elements
            })
        })
    }

    render() {
        const listOfElement = this.state.listOfElement && this.state.listOfElement.map((element, index)=> {
            if(element.type === 'directory') {
                return <div className='folder' key={'filename' + index} onClick={() => this.onSelectWorkingDirectory(element.filename)}><img alt='folder' src={Folder} /> { element.basename }</div>
            } else {
                return <div className='file' key={'filename' + index}><img alt='file' src={File} /> { element.basename }</div>
            }
        })
        return (
            <div id='selectDirectory'>
                <input id='workingDirectory' name='workingDirectory' value={ this.state.workingDirectory } onClick={ this.selectDirectory } onChange={ this.onChange } type='text' />
                <Modal
                    isOpen={this.state.selectDirectory}
                    onRequestClose={this.closeSelectDirectory}
                    style={customStyles}
                    contentLabel="Working Directory"
                >
                    <div className='modal-container'>
                        <div className='modal-title'>
                            Working Directory <span className='close' onClick={ this.closeSelectDirectory }>X</span>
                        </div>
                        <div>Choose working directory *</div>
                        <div className='explorer'>
                            { this.state.workingDirectory !== '/' && <div className='back' onClick={ this.onBackWorkingDirectory }> <img alt='back' src={Back} /> Back </div> }
                            <div className='list'> { listOfElement } </div>
                        </div>
                        <div>Choosen path: {this.state.workingDirectory}</div>
                        <div className='submit' onClick={ this.closeSelectDirectory }> Select </div>
                    </div>
                </Modal>
            </div>
        );
    }
}
