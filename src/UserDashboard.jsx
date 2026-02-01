import { useNavigate } from "react-router-dom";
import { AuthContext } from "./AuthContext";
import "./css/dashboard.css";
import { useContext } from "react";
import { getCart } from "./cartStorag";
   
export default function UserDashboard() {

     const {login , logout } = useContext(AuthContext);
   
  // console.log(login)
const navget = useNavigate();
 const hendallogout = () => {
         logout(false)
        navget('/')
 }

   function getLogin() {
     return JSON.parse(localStorage.getItem('isLogin')) || [];
   }

   const user = JSON.parse(localStorage.getItem("currentUser"));
    
  return (
    <div className="container-fluid bg-light min-vh-100">
      <div className="row">

        {/* SIDEBAR */}
        <aside className="col-md-3 col-lg-2 sidebar p-4">
          <h5 className="text-white mb-4">My Account</h5>

          <ul className="nav flex-column gap-2">
            <li className="nav-item">
              <a className="nav-link active text-white" href="#">
                Dashboard
              </a>
            </li>
            <li className="nav-item">
              <a className="nav-link text-white" href="#">
                My Orders
              </a>
            </li>
            <li className="nav-item">
              <a className="nav-link text-white" href="#">
                Profile
              </a>
            </li>
            <li className="nav-item">
              <a className="nav-link text-white" href="#">
                Addresses
              </a>
            </li>
          </ul>

          <button onClick={()=>hendallogout()} className="btn logout-btn mt-auto w-100">
            ⏻ Logout
          </button>
        </aside>

        {/* MAIN CONTENT */}
        <main className="col-md-9 col-lg-10 p-4">

          {/* HEADER */}
          <div className="d-flex justify-content-between align-items-center mb-4">
            <h3 className="fw-bold text-success">Dashboard</h3>
            <button onClick={() => navget('/product')}  className="btn btn-outline-success">
              Continue Shopping →
            </button>
          </div>

          {/* USER CARD */}
          <div className="card shadow-sm mb-4">
            <div className="card-body d-flex align-items-center gap-3">
              <img
                src="https://i.pravatar.cc/80"
                className="rounded-circle"
                alt="user"
              />
              <div>
                <h6 className="mb-0">{user?.name || getLogin().name}</h6>
                <small className="text-muted">{user?.email}</small>
              </div>
            </div>
          </div>

          {/* STATS */}
          <div className="row g-3 mb-4">
            <div className="col-md-3">
              <div className="card text-center shadow-sm">
                <div className="card-body">
                  <small>Total Orders</small>
                  <h4 className="fw-bold">12</h4>
                </div>
              </div>
            </div>

            <div className="col-md-3">
              <div className="card text-center shadow-sm bg-warning-subtle">
                <div className="card-body">
                  <small>Pending</small>
                  <h4 className="fw-bold">2</h4>
                </div>
              </div>
            </div>

            <div className="col-md-3">
              <div className="card text-center shadow-sm bg-success text-white">
                <div className="card-body">
                  <small>Delivered</small>
                  <h4 className="fw-bold">9</h4>
                </div>
              </div>
            </div>

            <div className="col-md-3">
              <div className="card text-center shadow-sm">
                <div className="card-body">
                  <small>Wishlist</small>
                  <h4 className="fw-bold">5</h4>
                </div>
              </div>
            </div>
          </div>

          {/* RECENT ORDERS */}
          <div className="card shadow-sm">
            <div className="card-body">
              <h5 className="text-success mb-3">Recent Orders</h5>

              <div className="table-responsive">
                <table className="table align-middle">
                  <thead className="table-light">
                    <tr>
                      <th>Order ID</th>
                      <th>Date</th>
                      <th>Status</th>
                      <th>Total</th>
                      <th></th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td>#10234</td>
                      <td>12 Sep 2025</td>
                      <td>
                        <span className="badge bg-success">
                          Delivered
                        </span>
                      </td>
                      <td>$120.00</td>
                      <td>
                        <button className="btn btn-sm btn-outline-success">
                          View
                        </button>
                      </td>
                    </tr>

                    <tr>
                      <td>#10235</td>
                      <td>18 Sep 2025</td>
                      <td>
                        <span className="badge bg-warning text-dark">
                          Pending
                        </span>
                      </td>
                      <td>$75.00</td>
                      <td>
                        <button className="btn btn-sm btn-outline-success">
                          View
                        </button>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>

            </div>
          </div>

        </main>
      </div>
    </div>
  );
}
