import store from "./store";
import {Provider} from 'react-redux'
import Navbar from "./component/navbar";
import {BrowserRouter as Router, Routes, Route} from 'react-router-dom'
import RegisterForm from "./component/registerForm";
import {ToastContainer} from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css';
import Contact from './component/contact'
import Loginform from "./component/Loginform";
import PrivateRoute from "./component/privateRoute";

function App() {
  return (
    <Router>
      <Provider store={store}>
        <div className="w-full min-h-screen">
          <Navbar></Navbar>
         <Routes>
            <Route path='/register' element={<RegisterForm></RegisterForm>}></Route>
            <Route path='/contact' element={<PrivateRoute/>}>
              <Route path='/contact' element={<Contact/>}></Route><Route path='/contact' element={<Contact/>}></Route>
            </Route>
             <Route path='/login' element={<Loginform/>}></Route>
            
          </Routes>
          <ToastContainer position="top-right"
autoClose={5000}
hideProgressBar={false}
newestOnTop={false}
closeOnClick
rtl={false}
pauseOnFocusLoss
draggable
pauseOnHover></ToastContainer>
        </div>
      </Provider>
    </Router>
  );
}

export default App;
