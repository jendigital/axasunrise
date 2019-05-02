import React, { Component } from 'react';
import Modal from 'react-modal';
import { connect } from 'react-redux';
import { fileManager } from "../../../../../utils";
import { groupActions } from '../../../../../actions';

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
const directoryItems = configDirectory.getDirectoryContents("/");


class CompareModel extends Component {
    constructor(props) {
        super(props);

        this.state = {
            deletingModel: false,
            error: false
        };

        this.props.dispatch(groupActions.list())

        this.compareModel = this.compareModel.bind(this);
        this.closeCompareModel = this.closeCompareModel.bind(this);
        this.onChange = this.onChange.bind(this);
        this.chooseDirectory = this.chooseDirectory.bind(this);
        this.chooseParameterFile = this.chooseParameterFile.bind(this);
        this.chooseScenarioFile = this.chooseScenarioFile.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
    }

    compareModel() {
        this.setState({deletingModel: true});
    }

    closeCompareModel() {
        this.setState({deletingModel: false});
    }

    onChange(event) {
        const target = event.target;
        const value = target.value;
        const name = target.name;
        
        this.setState({
            [name]: value
        });
    }

    chooseDirectory(path) {
        this.setState({
            workingDirectory: path
        })
    }

    chooseParameterFile(file) {
        this.setState({
            parameterLevelFile: file
        })
    }

    chooseScenarioFile(file) {
        this.setState({
            scenarioMappingFile: file
        })
    }

    onSubmit(event) {
        if(this.state.modelName === '') {
            this.setState({
                error: true
            })
        } else if(this.state.modelDescription === '') {
            this.setState({
                error: true
            })
        } else if(this.state.parameterLevelFile === '') {
            this.setState({
                error: true
            })
        } else {
            this.setState({
                error: false
            })
            console.log(this.state.modelName)
            console.log(this.state.modelDescription)
            console.log(this.state.modelMajor)
            console.log(this.state.modelMinor)
            console.log(this.state.modelRelease)
            console.log(this.state.parameterLevelFile)
            console.log(this.state.workingDirectory)
            console.log(this.state.modelLevel)
            console.log(this.state.scenarioMappingFile)
        }
    }

    render() {
        const { user, groups } = this.props;

        return (
            <div id='modelCompare'>
                <div className={this.state.deletingModel ? 'active model_action' : 'model_action'} onClick={this.compareModel}>
                    COMPARE
                </div>
                <Modal
                    isOpen={this.state.deletingModel}
                    onRequestClose={this.closeCompareModel}
                    style={customStyles}
                    contentLabel="Model Deletion"
                >
                    <div className='modal-container'>
                        <div className='modal-title'>
                            Which one is the reference <span className='close' onClick={this.closeCompareModel}>X</span>
                        </div>
                        <div><input type='radio' value /> {'modelname'}</div>
                        <div><input type='radio' value /> {'modelname'}</div>
                        <div className='submit' onClick={this.onSubmit}> Yes </div>
                        <div className='submit' onClick={this.onSubmit}> No </div>
                    </div>
                </Modal>
            </div>
        );
    }
}

function mapStateToProps(state) {
    const { groups, auth } = state;
    const { user } = auth;

    return {
        user,
        groups: groups.data
    };
}

export default connect(mapStateToProps)(CompareModel)
