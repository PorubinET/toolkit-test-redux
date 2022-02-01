import React from "react";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { taskLoad } from "./store/todoSlice"
import TaskInput from "./components/taskInput/taskInput";
import { MuiPickersUtilsProvider } from '@material-ui/pickers';
import MomentUtils from '@date-io/moment';






import Footer from "./components/footer/footer";

import "./App.css";


function App() {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(taskLoad())
}, [dispatch]);


  return (
    <MuiPickersUtilsProvider utils={MomentUtils}>
      <div className="App">
        <div className="wrapper">
          <div className="to-do">
            <h1 className="to-do__title">todos</h1>
            <div className="to-do__block">
              <TaskInput />
              <Footer />
            </div>
          </div>
        </div>
      </div>
    </MuiPickersUtilsProvider>
  )
}


export default App;















// import React from "react";
// import TaskInput from "./components/taskInput/taskInput";
// // import Footer from "./components/footer/footer";
// import { MuiPickersUtilsProvider } from '@material-ui/pickers';
// import MomentUtils from '@date-io/moment';
// import { useDispatch } from "react-redux";
// // import DateFnsUtils from '@date-io/date-fns';
// // import LuxonUtils from '@date-io/luxon';
// import "./App.css";


// function App() {
//   return (
//     <MuiPickersUtilsProvider utils={MomentUtils}>
//       <div className="App">
//         <div className="wrapper">
//           <div className="to-do">
//             <h1 className="to-do__title">todos</h1>
//             <div className="to-do__block">
//               <TaskInput />
//               {/* <Footer /> */}
//             </div>
//           </div>
//         </div>
//       </div>
//     </MuiPickersUtilsProvider>
//   )
// }


// export default App;