import { configureStore } from '@reduxjs/toolkit';
import { render, screen , fireEvent, waitFor, findByText } from '@testing-library/react';
import { Provider } from 'react-redux';
import { App } from './App';
import { ArtItem } from './components/ArtItem';
import { Notifications } from './components/Notifications';
import {  NotificationTypes } from "./components/Notifications/index.types";
import { Artwork } from './constants/artworks';
import { store } from './store';
import SagaTester from "redux-saga-tester";
import rootSaga from './sagas';
import artworksReducer, { postArtworkRating } from './reducers/artworks';
import notificationsReducer from './reducers/notifications';
import artworkFormReducer from './reducers/artworkForm';
import { State } from './store/index.types';
import { delay } from 'redux-saga/effects';

test('has title', () => {
  render(
    <Provider store={store}>
      <App />
    </Provider>
  );
  const title = screen.getByText('Art Rater');
  expect(title).toBeInTheDocument();
});

test('for an art item, submit button is disabled until a rating is selected', async () => {
  const disabledButtonProps: Artwork = { id: 12345, disabled: false } ;
  render(<Provider store={store}><ArtItem {...disabledButtonProps} /></Provider>);
  // Grab the 1 rating button
  const oneRatingButton: HTMLButtonElement = await screen.findByTestId('12345-set-rating-1');
  // Submit button should be disabled by default (no rating)
  await waitFor(() => expect(screen.getByText('Submit')).toBeDisabled());
  fireEvent.click(oneRatingButton);
  // Submit button should be enabled after selecting a rating
  await waitFor(() => expect(screen.getByText('Submit')).toBeEnabled);
});

test('for an art item, clicking numbered button updates the star rating', async () => {
  const disabledButtonProps: Artwork = { id: 12345, disabled: false } ;
  render(<Provider store={store}><ArtItem {...disabledButtonProps} /></Provider>);
  // Grab the 1 rating button
  const oneRatingButton: HTMLButtonElement = await screen.findByTestId('12345-set-rating-1');
  fireEvent.click(oneRatingButton);
  // Expect that the rating should display 1 star
  await waitFor(() => expect(screen.getByTestId('12345-rating-1')).toBeInTheDocument());
});

test('for an art item, clicking numbered button updates the star rating, clicking two different numbers one after the other', async () => {
  const disabledButtonProps: Artwork = { id: 12345, disabled: false } ;
  render(<Provider store={store}><ArtItem {...disabledButtonProps} /></Provider>);
  // Grab the 1 and 2 rating buttons
  const oneRatingButton: HTMLButtonElement = await screen.findByTestId('12345-set-rating-1');
  const twoRatingButton: HTMLButtonElement = await screen.findByTestId('12345-set-rating-2');
  // Simulate clicking on the 1 rating
  fireEvent.click(oneRatingButton);
  // Simulate clicking on the 2 rating
  fireEvent.click(twoRatingButton);
  // Expect that the rating should display 2 stars and not 1
  await waitFor(() => expect(screen.getByTestId('12345-rating-2')).toBeInTheDocument());
});

test('for an art item, clicking submit POSTs update, displays a toast success message, hides buttons', async () => {
  const disabledButtonProps: Artwork = { id: 12345, disabled: false } ;
  const notificationObj = {
    message: 'Success!',
    type: 'success' as NotificationTypes
  };
  render(
    <Provider store={store}>
      <ArtItem {...disabledButtonProps} />
      <Notifications notifications={[notificationObj]}/>
    </Provider>
  );
  // Grab the 1 rating button
  const oneRatingButton: HTMLButtonElement = await screen.findByTestId('12345-set-rating-1');
  fireEvent.click(oneRatingButton);
  const submitButton: HTMLButtonElement = await screen.findByTestId('12345-submit-rating');
  fireEvent.click(submitButton);
  await waitFor(() => expect(screen.getByTestId('toast-success')).toBeInTheDocument());
});

test('for an art item, posting the artwork rating updates the store', async () => {
  const delay = (t: number | undefined) => new Promise<void>(res => setTimeout(() => res(), t));
  const sagaTester = new SagaTester({
    reducers: {
      artworks: artworksReducer
    }
  });
  sagaTester.start(rootSaga);

  sagaTester.dispatch(postArtworkRating({id: 27992, rating: 1}));

  await delay(1000);
  // Get state
  const state = sagaTester.getState() as State;
  // Get the artwork that was supposedly updated
  const artwork = state.artworks.artworks.filter((art: Artwork) => art.id === 27992);
  // Check if artwork was indeed updated with the correct rating
  expect(artwork[0].newRating).toEqual('1');
});