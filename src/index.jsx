import { createRoot } from 'react-dom/client';
import "bootstrap/dist/css/bootstrap.min.css";
import Container from 'react-bootstrap/Container';

import "./index.scss";
import { MainView } from './components/main-view/main-view';
import { Provider } from 'react-redux';
import { store } from './store/store';  // Import the Redux store

const MyFlixApplication = () => {
  return (
    <Provider store={store}>  {/* Wrap the entire app with Provider */}
      <Container>
        <MainView />
      </Container>
    </Provider>
  );
};

// Finds the root of your app
const container = document.querySelector("#root");
const root = createRoot(container);

// Tells React to render your app in the root DOM element
root.render(<MyFlixApplication />);