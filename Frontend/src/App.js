import "./App.css";
import "./components/react-notifications/notificacion.css";

// import { BrowserRouter, Route, Routes } from "react-router-dom";
// import UserList from "./pages/userList/UserList";
// import User from "./pages/user/User";
// import NewUser from "./pages/newUser/NewUser";

// import NewProduct from "./pages/newProduct/NewProduct";

// function App() {
//   return (
//     <BrowserRouter>
//       <Routes>
//         <Topbar />
//         <div className="container">
//           <Sidebar />

//           <Route path="/" element={<Home />} />
//           {/* <Route path="/users">
//           <UserList />
//         </Route>
//         <Route path="/user/:userId">
//           <User />
//         </Route>
//         <Route path="/newUser">
//           <NewUser />
//         </Route>
//         <Route path="/products">
//           <ProductList />
//         </Route>
//         <Route path="/product/:productId">
//           <Product />
//         </Route>
//         <Route path="/newproduct">
//           <NewProduct />
//         </Route> */}
//         </div>
//       </Routes>
//     </BrowserRouter>
//   );
// }

// export default App;

import React from "react";
import { Route, Routes } from "react-router-dom";
import "bootstrap-icons/font/bootstrap-icons.css";
import Login from "./pages/Login/Login";
import { NotificationContainer } from "./components/react-notifications";
import Principal from "./pages/Login/Principal/Principal";

const App = () => {
  return (
    <>
      <NotificationContainer />

      <Routes>
        <Route path="/singIn" index element={<Login />} />

        <Route path="/principal/*" element={<Principal />} />
        <Route path="/*" element={<Principal />} />
       
      </Routes>
    </>
  );
};

export default App;
