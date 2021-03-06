// @flow

import { select } from 'redux-saga/effects'

export function deleteUndefined<T: {}>(obj: T): T {
    // mutates obj
    for (const [k, v] of Object.entries(obj)) {
        if (v === undefined) delete obj[k];
    }
    return obj;
}

const NEXT_ID: { [string]: Id } = {};
export const getId = function* getId(reducer: string) {
    // reducer must have shpae { [Id]: { id } }
    if (!(reducer in NEXT_ID)) {
        const { [reducer]:entrys } = yield select();
        const ids = Object.keys(entrys);
        NEXT_ID[reducer] = (ids.length ? Math.max(...ids) : -1).toString();
    }
    return (++NEXT_ID[reducer]).toString();
}
/*
//
const REQUEST_ADD = A`REQUEST_ADD`;
type RequestAddAction = { type:typeof REQUEST_ADD, action:Action }
const requestAdd = (action): RequestAddAction => ({ type:REQUEST_ADD, action });

const requestAddSaga = function* requestAddSaga() {
    // re-run resume whenever resume action happens
    while (true) {
        yield take(REQUEST_ADD);
        const id = call(getId, 'pendings');
        yield put(add(action.action, id));
    }
}
sagas.push(requestAddSaga);
*/
