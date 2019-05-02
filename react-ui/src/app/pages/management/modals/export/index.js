import React, { Component } from 'react';
import Modal from 'react-modal';
import { connect } from 'react-redux';
import { fileManager } from "../../../../../utils";
import { groupActions } from '../../../../../actions';
import SelectDirectory from "../selectdirectory"
import SelectParameterFile from "../selectparameterfile"
import SelectScenarioFile from "../selectscenariomapping"

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

class ExportModel extends Component {
    constructor(props) {
        super(props);

        this.state = {
            exportingModel: false,
            error: false,
        };

        this.props.dispatch(groupActions.list())

        this.exportModel = this.exportModel.bind(this);
        this.closeExportModel = this.closeExportModel.bind(this);
        this.onChange = this.onChange.bind(this);
        this.chooseDirectory = this.chooseDirectory.bind(this);
        this.chooseParameterFile = this.chooseParameterFile.bind(this);
        this.chooseScenarioFile = this.chooseScenarioFile.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
    }

    exportModel() {
        this.setState({exportingModel: true});
    }

    closeExportModel() {
        this.setState({exportingModel: false});
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
            <div id='modelExport'>
                <div className={this.state.exportingModel ? 'active model_action' : 'model_action'} onClick={this.exportModel}>
                    EXPORT
                </div>
                <Modal
                    isOpen={this.state.exportingModel}
                    onRequestClose={this.closeExportModel}
                    style={customStyles}
                    contentLabel="Model Exportation"
                >
                    <div className='modal-container'>
                        <div className='modal-title'>
                            Export Model <span className='close' onClick={this.closeExportModel}>X</span>
                        </div>
                        <form>
                            Select Target Location to export current Model. Extension file must be '.srm'.
                            <div className='form-line'>
                                <div className='form-label'>Location* </div>
                                <SelectParameterFile chooseParameterFile={this.chooseParameterFile} />
                            </div>
                            <div className='submit' onClick={this.onSubmit}> Export </div>
                            <div className='submit' onClick={this.onSubmit}> Cancel </div>
                        </form>
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

export default connect(mapStateToProps)(ExportModel)
