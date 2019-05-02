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


class CreateModel extends Component {
    constructor(props) {
        super(props);

        this.state = {
            creatingModel: false,
            error: false,
            modelDescription: '',
            modelLevel: '1',
            modelMajor: '1',
            modelMinor: '0',
            modelName: '',
            modelRelease: '0',
            parameterLevelFile: '',
            scenarioMappingFile: '',
            workingDirectory: '',
        };

        this.props.dispatch(groupActions.list())

        this.createModel = this.createModel.bind(this);
        this.closeCreateModel = this.closeCreateModel.bind(this);
        this.onChange = this.onChange.bind(this);
        this.chooseDirectory = this.chooseDirectory.bind(this);
        this.chooseParameterFile = this.chooseParameterFile.bind(this);
        this.chooseScenarioFile = this.chooseScenarioFile.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
    }

    createModel() {
        this.setState({creatingModel: true});
    }

    closeCreateModel() {
        this.setState({creatingModel: false});
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
            <div id='modelCreate'>
                <div className={this.state.creatingModel ? 'active model_action' : 'model_action'} onClick={this.createModel}>
                    CREATE
                </div>
                <Modal
                    isOpen={this.state.creatingModel}
                    onRequestClose={this.closeCreateModel}
                    style={customStyles}
                    contentLabel="Model Creation"
                >
                    <div className='modal-container'>
                        <div className='modal-title'>
                            Model creation <span className='close' onClick={this.closeCreateModel}>X</span>
                        </div>
                        <form>
                            <div className='form-line'>
                                <div className='form-label'>Model name*</div>
                                <input name='modelName' type='text' value={this.state.modelName} onChange={this.onChange} />
                            </div>
                            <div className='form-line'>
                                <div className='form-label'>Model description*</div>
                                <input name='modelDescription' type='text' value={this.state.modelDescription} onChange={this.onChange} />
                            </div>
                            <div className='form-line'>
                                <div className='form-label'>Model version (major.minor.release)</div>
                                <div className='form-version'>
                                    <div className='form-version-container'>
                                        Major
                                        <input name='modelMajor' type='number' value={this.state.modelMajor} onChange={this.onChange} />
                                    </div>
                                    <div className='form-version-container'>
                                        Minor
                                        <input name='modelMinor' type='number' value={this.state.modelMinor} onChange={this.onChange} />
                                    </div>
                                    <div className='form-version-container'>
                                        Release
                                        <input name='modelRelease' type='number' value={this.state.modelRelease} onChange={this.onChange} />
                                    </div>
                                </div>
                            </div>
                            <div className='file-header'><div className='path'>Path</div><div className='sep'>Separator</div><div className='scope'>Scope</div></div>
                            <div className='form-line'>
                                <div className='form-label'>Parameter Level File</div>
                                <SelectParameterFile chooseParameterFile={this.chooseParameterFile} />
                            </div>
                            <div className='form-line'>
                                <div className='form-label'>Working directory</div>
                                <SelectDirectory chooseDirectory={this.chooseDirectory} />
                            </div>
                            <div className='form-line'>
                                <div className='form-label'>Model level</div>
                                <select name='modelLevel' onChange={this.onChange} >
                                    {groups && groups.map(group => {
                                        return(
                                            <option key={'modelLevel'+group.id} value={group.id}>{group.name}</option>
                                        )
                                    })}
                                </select>
                            </div>
                            <div className='file-header'><div className='path'>Path</div><div className='sep'>Separator</div><div className='hasHeader'>Has header</div></div>
                            <div className='form-line'>
                                <div className='form-label'>Scenario mapping file</div>
                                <SelectScenarioFile chooseScenarioFile={this.chooseScenarioFile} />
                            </div>
                            {this.state.error &&
                                <div className='error'>
                                    *Merci de remplir tous les champs obligatoires
                                </div> 
                            }
                            <div className='submit' onClick={this.onSubmit}> Finish </div>
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

export default connect(mapStateToProps)(CreateModel)
