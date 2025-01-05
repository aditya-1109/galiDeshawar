import './App.css';
import {createBrowserRouter, RouterProvider} from "react-router-dom";
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

const routes=createBrowserRouter([
  {
    path: "/home",
    element: <Home />
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
    element: <Wallet />
  },
  {
    path: "/profile",
    element: <Profile />
  },
  {
    path: "/played",
    element: <Played />
  },
  {
    path: "/GameRate",
    element: <GameRate />
  },
  {
    path: "/addFunds",
    element: <AddFunds />
  },
  {
    path: "/withdrawal",
    element: <WithDrawal />
  },
  {
    path: "/transfer",
    element: <Transfer />
  },
  {
    path: "/info",
    element: <Info />
  },
  {
    path: "chart",
    element: <Chart />
  },
  {
    path: "/bid/:lotteryName",
    element: <Bid />
  },
  {
    path: "/placebid/:lotteryName/:bidName",
    element: <PlaceBid />
  },
  {
    path:"/admin",
    element: <Admin />
  }
])

function App() {
  return (
    <RouterProvider router={routes} />
  );
}

export default App;
