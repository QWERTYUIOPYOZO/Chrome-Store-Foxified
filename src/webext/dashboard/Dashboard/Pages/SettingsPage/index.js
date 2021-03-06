// @flow

import React, { PureComponent } from 'react'

import { callInBackground } from '../../../connect'

import './index.css'

class SettingsPage extends PureComponent<void, void> {
    render() {
        return (
            <div>
                <p className="Page--intro">
                    Customize your experience ^_^
                </p>
                <b>Memory</b> <button onClick={this.purgeStore}>Clear Memory</button>
            </div>
        )
    }

    purgeStore() {
        callInBackground('purgeStore');
        alert('Memory was cleared! On the next load of extension (browser restart, or extension disable then re-enable), none of the current state will be restored. Unless you do more actions right now, that cause the state to be saved again.')
    }
}

export default SettingsPage
