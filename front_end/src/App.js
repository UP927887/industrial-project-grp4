import './App.css';
import { VideoLiveFeed } from './videofeed/VideoFeed';
import { Login } from './login/Login';
// import { BrowserRouter, Route, Routes} from "react-router-dom";

function App() {
  return (
    <div>
      <div className='App'>
        <Login />
        {/* <BrowserRouter>
          <Routes>
            <Route path="/videofeed" element={VideoLiveFeed}></Route>
          </Routes>
        </BrowserRouter> */}
      </div>
    </div>
  );
}

export default App;
