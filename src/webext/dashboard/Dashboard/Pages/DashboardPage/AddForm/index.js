// @flow

import React, { PureComponent } from 'react'
import { Field } from 'redux-form'
import classnames from 'cmn/lib/classnames'

import { callInBackground } from '../../../../connect'
import withApiForm from '../../../../../withApiForm'

import ErrorBox from './ErrorBox'
import FieldText from './Fields/FieldText'
import FieldFile from './Fields/FieldFile'

import './index.css'

import type { FormProps } from 'redux-form'

type Props = {
    // redux-form
    ...FormProps,
    submitting: boolean,
    // comm-redux
    dispatchProxied: () => void
}

type State = {
    or?: 'computer' | 'storeUrl'
}

class AddFormDumb extends PureComponent<Props, State> {
    state = {
        or: undefined
    }

    triggerSubmit: () => void // withApiForm

    render() {
        const { submitting, form, error } = this.props;
        const { or } = this.state;

        console.log('this.triggerSubmit:', this.triggerSubmit);
        return (
            <form onSubmit={this.triggerSubmit} className="AddForm">
                <fieldset className="AddForm--fieldset">
                    <legend>Add New Extension</legend>
                    <ErrorBox form={form} error={error} />
                    <div className="Field--row">
                        <div className={classnames('AddForm--col', or === 'fileDataUrl' && 'AddForm--col--0')}>
                            <Field component={FieldText} name="storeUrl" disabled={submitting} label="Store URL" flexAnyField={this.flexAnyField} />
                            <div className="Field--col">
                                <div className="Field--desc">
                                    Example: <pre className="AddForm--pre-inline">https://chrome.google.com/webstore/detail/pull-refresh/ldmkbocokmbbffifgfoejohifpcienih</pre>
                                </div>
                            </div>
                        </div>
                        <div className={classnames('AddForm--or', or && 'AddForm--col--0')}>
                            <hr className="AddForm--hr" />
                            <span className="AddForm--or--label">OR</span>
                            <hr className="AddForm--hr" />
                        </div>
                        <div className={classnames('AddForm--col', or === 'storeUrl' && 'AddForm--col--0')}>
                            <Field component={FieldFile} name="fileDataUrl" disabled={submitting} label="My Computer" flexAnyField={this.flexAnyField} />
                            <div className="Field--row">
                                <div className="Field--desc">
                                    Select a extensison package file from your computer
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="AddForm--control">
                        <button disabled={submitting} style={{fontSize:'1.1em',fontWeight:500}}>Add to Firefox</button>
                        { submitting && <span>Validating with server...</span> }
                    </div>
                </fieldset>
            </form>
        )
    }

    handleSubmitOk = reply => {
        console.log('reply:', reply);
        this.props.reset();
    }

    flexAnyField = name => this.setState(() => ({ or:name }))
}

const AddForm = withApiForm('valdiate')(AddFormDumb)

export default AddForm
