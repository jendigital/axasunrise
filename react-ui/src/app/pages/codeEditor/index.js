import React, { Component } from 'react';
import Tabs, { Tab } from 'react-awesome-tabs';
import MonacoEditor from 'react-monaco-editor';

import MainLayout from '../../layouts/default';

import './index.css';
import 'react-awesome-tabs/dist/react-awesome-tabs.css'

export default class CodeEditor extends Component {
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
    
    editorDidMount(editor, monaco) {
        console.log('editorDidMount', editor);
        editor.focus();
        let hideArea = new monaco.Range(0, 0, 3, 0);
        editor.setHiddenAreas([hideArea]);
        monaco.languages.registerCompletionItemProvider('cpp', {
            provideCompletionItems: () => {
                return [
                    {
                        label: 'simpleText',
                        kind: monaco.languages.CompletionItemKind.Text
                    }, {
                        label: 'testing',
                        kind: monaco.languages.CompletionItemKind.Keyword,
                        insertText:{ value : 'testing({{condition}})'}
                    },
                    {
                        label: 'ifelse',
                        kind: monaco.languages.CompletionItemKind.Snippet,
                        insertText: { value : [
                            'if ({{condition}}) {',
                            '\t{{}}',
                            '} else {',
                            '\t',
                            '}'
                        ].join('\n') },
                        documentation: 'If-Else Statement'
                    }
                ]
            }
        });
    }

    onChange(newValue, e) {
        console.log('onChange', newValue, e);
    }

	constructor(props) {
		super(props);
		this.state = {
            activeTab: 0,
            code: 'type your code'
		};

		this.tabs = [
			{
				title: 'Code1',
				content: '#include <iostream>\nusing namespace std;\nint main() \n{\n    cout << "Hello, World!";\n    return 0;\n}'
			},
			{
				title: 'Code2',
				content: '#include <iostream>\nusing namespace std;\nint main() \n{\n    cout << "Hello, World!";\n    return 0;\n}'
			},
			{

				title: 'Code3',
				content: '#include <iostream>\nusing namespace std;\nint main() \n{\n    cout << "Hello, World!";\n    return 0;\n}'
			},
		];
	}

    render() {
        const code = this.state.code;
        const options = {
            selectOnLineNumbers: true
        };
        return (
            <MainLayout active={'codeEditor'} section_active={''}>
                <div id='codeEditor'>
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
                                    <MonacoEditor
                                        width="800"
                                        height="600"
                                        language="javascript"
                                        theme="vs"
                                        value={value.content}
                                        options={options}
                                        onChange={this.onChange}
                                        editorDidMount={this.editorDidMount}
                                    />
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
