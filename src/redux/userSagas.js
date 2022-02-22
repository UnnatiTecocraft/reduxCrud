import {
    take,
    takeEvery,
    takeLatest,
    call,
    put,
    all,
    fork,
    delay,
} from "redux-saga/effects";
import {
    loadUsersSuccess,
    loadUsersError,
    createUserSuccess,
    createUserError,
    deleteUserSuccess,
    deleteUserStart,
    updateUserSuccess,
    updateUserError,
} from "./actions";
import {
    CREATE_USER_START,
    DELETE_USER_START,
    LOAD_USERS_START,
    UPDATE_USER_START,
} from "./actionTypes";
import {
    createUserApi,
    deleteUserApi,
    loadUserApi,
    updateUserApi,
} from "./api";

function* onLoadUsersStartAsync() {
    try {
        const response = yield call(loadUserApi);
        if (response.status === 200) {
            yield put(loadUsersSuccess(response.data));
        }
    } catch (error) {
        yield put(loadUsersError(error.response.data));
    }
}

function* onCreateUserStartAsync({ payload }) {
    try {
        const response = yield call(createUserApi, payload);
        if (response.status === 200) {
            yield put(createUserSuccess(response.data));
        }
    } catch (error) {
        yield put(createUserError(error.response.data));
    }
}

function* onDeleteUserStartAsync(userId) {
    try {
        const response = yield call(deleteUserApi, userId);
        if (response.status === 200) {
            yield delay(500);
            yield put(deleteUserSuccess(userId));
        }
    } catch (error) {
        yield put(deleteUserStart(error.response.data));
    }
}

function* onUpdateUserStartAsync({ payload: { id, formValue } }) {
    try {
        const response = yield call(updateUserApi, id, formValue);
        yield put(updateUserSuccess());
    } catch (error) {
        yield put(updateUserError(error.response.data));
    }
}

function* onDeleteUser() {
    while (true) {
        const { payload: userId } = yield take(DELETE_USER_START);
        yield call(onDeleteUserStartAsync, userId);
    }
}

function* onLoadUsers() {
    yield takeEvery(LOAD_USERS_START, onLoadUsersStartAsync);
}

function* onCreateUser() {
    yield takeLatest(CREATE_USER_START, onCreateUserStartAsync);
}

function* onUpdateUser() {
    yield takeLatest(UPDATE_USER_START, onUpdateUserStartAsync);
}

const userSagas = [
    fork(onLoadUsers),
    fork(onCreateUser),
    fork(onDeleteUser),
    fork(onUpdateUser),
];

export default function* rootSaga() {
    yield all([...userSagas]);
}
