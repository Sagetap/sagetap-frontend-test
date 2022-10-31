import artworksReducer from '../reducers/artworks';
import notificationsReducer from '../reducers/notifications';
import artworkFormReducer from '../reducers/artworkForm';
import { configureStore, getDefaultMiddleware } from '@reduxjs/toolkit';
import createSagaMiddleware from 'redux-saga';
import rootSaga from '../sagas';

const sagaMiddleware = createSagaMiddleware();

export const store = configureStore({
  reducer: { 
    artworks: artworksReducer,
    notifcations: notificationsReducer,
    artworkForm: artworkFormReducer
  },
  middleware: [...getDefaultMiddleware(), sagaMiddleware]
});

sagaMiddleware.run(rootSaga);