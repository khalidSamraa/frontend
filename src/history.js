import createHistory from 'history/createBrowserHistory';

const history = createHistory();

history.listen((location) => {
    console.log('location: ', location);
});

export default history;
