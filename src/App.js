import './App.css';
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Home from './home';
import Login from './login';
import Register from './register';
import Wallet from './wallet';
import Profile from './profile';
import Played from './playedMatch';
import GameRate from './gameRate';
import AddFunds from './addFunds';
import WithDrawal from './withdrawal';
import Transfer from './transfer';
import Info from './info';
import Chart from './chart';
import Bid from './bid';
import PlaceBid from './placeBid';
import Admin from './admin';
import ProtectedRoute from './ProtectRoute';

let isAuthenticated= false;

const number= localStorage.getItem("number");
if(number){
  isAuthenticated=true;
}


const routes = createBrowserRouter([
  {
    path: "/home",
    element: (
      <ProtectedRoute isAuthenticated={isAuthenticated}>
        <Home />
      </ProtectedRoute>
    ),
  },
  {
    path: "/",
    element: <Login />
  },
  {
    path: "/register",
    element: <Register />
  },
  {
    path: "/wallet",
    element: (
      <ProtectedRoute isAuthenticated={isAuthenticated}>
        <Wallet />
      </ProtectedRoute>
    ),
  },
  {
    path: "/profile",
    element: (
      <ProtectedRoute isAuthenticated={isAuthenticated}>
        <Profile />
      </ProtectedRoute>
    ),
  },
  {
    path: "/played",
    element: (
      <ProtectedRoute isAuthenticated={isAuthenticated}>
        <Played />
      </ProtectedRoute>
    ),
  },
  {
    path: "/GameRate",
    element: (
      <ProtectedRoute isAuthenticated={isAuthenticated}>
        <GameRate />
      </ProtectedRoute>
    ),
  },
  {
    path: "/addFunds",
    element: (
      <ProtectedRoute isAuthenticated={isAuthenticated}>
        <AddFunds />
      </ProtectedRoute>
    ),
  },
  {
    path: "/withdrawal",
    element: (
      <ProtectedRoute isAuthenticated={isAuthenticated}>
        <WithDrawal />
      </ProtectedRoute>
    ),
  },
  {
    path: "/transfer",
    element: (
      <ProtectedRoute isAuthenticated={isAuthenticated}>
        <Transfer />
      </ProtectedRoute>
    ),
  },
  {
    path: "/info",
    element: (
      <ProtectedRoute isAuthenticated={isAuthenticated}>
        <Info />
      </ProtectedRoute>
    ),
  },
  {
    path: "/chart/:lotteryName",
    element: (
      <ProtectedRoute isAuthenticated={isAuthenticated}>
        <Chart />
      </ProtectedRoute>
    ),
  },
  {
    path: "/bid/:lotteryName",
    element: (
      <ProtectedRoute isAuthenticated={isAuthenticated}>
        <Bid />
      </ProtectedRoute>
    ),
  },
  {
    path: "/placebid/:lotteryName/:bidName",
    element: (
      <ProtectedRoute isAuthenticated={isAuthenticated}>
        <PlaceBid />
      </ProtectedRoute>
    ),
  },
  {
    path: "/admin",
    element: (
      <ProtectedRoute isAuthenticated={isAuthenticated}>
        <Admin />
      </ProtectedRoute>
    ),
  }
]);

function App() {
  return (
    <RouterProvider router={routes} />
  );
}

export default App;
