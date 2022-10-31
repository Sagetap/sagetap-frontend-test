import { all, put, takeEvery } from 'redux-saga/effects';
import { setArtworkFormLoading } from '../reducers/artworkForm';
import { getArtworkData, postArtworkRating, postArtworkRatingSuccess, setArtwork, setArtworkLoading } from '../reducers/artworks';
import { showNotification } from '../reducers/notifications';
import { getArtwork, postRating } from '../services/api';

function* onGetArtwork({ payload }: ReturnType<typeof getArtworkData>): any {
  const { id } = payload;
  yield put(setArtworkFormLoading({ loading: true }));
  yield put(setArtworkLoading({id, loading: true}));
  try {
    const response = yield getArtwork(id);
    const newArtworkObj = Object.assign(response.data, {id});
    yield put(setArtwork( {artwork: newArtworkObj} ));
    yield put(setArtworkFormLoading({ loading: false }));
    yield put(setArtworkLoading({id, loading: false}));
  } catch (e) {
    const notificationObj = {
      message: 'Fetching artwork - failed',
      type: 'fail'
    };
    console.error(e);
    yield put(setArtworkFormLoading({ loading: false }));
    yield put(showNotification({notification: notificationObj}));
    yield put(setArtworkLoading({id, loading: false}));
  }
}

function* onSubmitArtworkRating({ payload }: ReturnType<typeof postArtworkRating>): any {
  const { id, rating } = payload;
  try {
    const response = yield postRating( {id, rating} );
    if(response.status === 200) {
      const notificationObj = {
        message: response.data.message,
        type: 'success'
      };
      yield put(showNotification({notification: notificationObj}));
      yield put(postArtworkRatingSuccess({id, rating}));
    }
  } catch (e) {
    const notificationObj = {
      message: 'Request Failed',
      type: 'fail'
    };
    yield put(showNotification({notification: notificationObj}));
    console.error(e);
  }
}

function *watchGetArtworksSaga() {
  yield takeEvery(getArtworkData.toString(), onGetArtwork);
}

function *watchPostRatingSaga() {
  yield takeEvery(postArtworkRating.toString(), onSubmitArtworkRating);
}

export default function *rootSaga() {
  yield all([
    watchGetArtworksSaga(),
    watchPostRatingSaga()
  ]);
}

