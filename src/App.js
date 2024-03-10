import React, { useState, useEffect } from "react";
import Axios from "axios";
// Components
import Home from "./Home";
import Signup from "./auth/Signup";
import Signin from "./auth/Signin";
import Cart from "./cart/Cart";
import ProductList from "./product/ProductList";
import Product from "./product/Product";
import ProductCreateForm from "./product/ProductCreateForm";
import UserDashboard from "./user/UserDashboard";
import jwt_decode from "jwt-decode";
import SearchResults from "./SearchResults";
// Bootstrap
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import image from './AGORA-LOGO.png'

// Router
import { BrowserRouter as Router, Route, Routes, Link } from "react-router-dom";
// Css
import "./App.css";
//icon

export const BASE_URL = process.env.API_URL;
console.log(BASE_URL)
console.log(process.env.API_URL)

export default function App() {
  const [isAuth, setIsAuth] = useState(false);
  const [user, setUser] = useState({});
  const [name, setName] = useState('');
  const [isSeller, setIsSeller] = useState(false);
  const [, setMessage] = useState(null);
  const [counter, setCounter] = useState(0);
  useEffect(() => {
    let token = localStorage.getItem("token");
    if (token != null) {
      let { user } = jwt_decode(token);
      if (user) {
        setIsAuth(true);

       Axios.get(`${BASE_URL}/user/dashboard?userId=${user?.id}`)
          .then(({ data }) => {
            setUser(data.user);
            setName(data.user.firstName)
            return setIsSeller(data.seller);
          })
          .catch((error) => {
            console.log(error);
          });
      } else if (!user) {
        localStorage.removeItem("token");
        setIsAuth(false);
      }
    }
  }, [isAuth]);
  
  const registerHandler = (user) => {
    Axios.post(`${BASE_URL}/auth/signup`, user)
      .then((response) => {
        localStorage.setItem("userId", response.data.user._id);

        handleSubmitFile(response.data.user._id);
      })
      .catch((error) => {
        console.log(error);
      });
  };
  const onLogoutHandler = (e) => {
    e.preventDefault();
    localStorage.removeItem("token");
    setIsAuth(false);
    setUser(null);
    setMessage("User logged out successfully");
    window.location = "/";
  };
  const buyItem = (id, productId) => {
    Axios.post(`${BASE_URL}/cart?userId=${id}&productId=${productId}`)
      .then((response) => {
        console.log(response);
      })
      .catch((error) => {
        console.log(error);
      });
  };
  const counterUp = () => {
    setCounter((prevCount) => prevCount + 1);
  };
  const counterDown = () => {
    setCounter((prevCount) => prevCount - 1);
  };
  const [products, setProducts] = useState([]);
  useEffect(() => {
    loadProductList();
  }, []);

  const loadProductList = () => {
    Axios.get(`${BASE_URL}/product/index`)
      .then((response) => {
        setProducts(response.data.products);
      })
      .catch((error) => {
        console.log(error);
      });
  };
  const loginHandler = (cred) => {
    Axios.post(`${BASE_URL}/auth/signin`, cred)
      .then((response) => {
        if (response.data.token != null) {
          localStorage.setItem("token", response.data.token);
          let { user } = jwt_decode(response.data.token);
          setIsAuth(true);
          setUser(user);
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const [previewSource, setPreviewSource] = useState();
  const handleFileInputChange = (e) => {
    const file = e.target.files[0];
    previewFile(file);
  };
  const previewFile = (file) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onloadend = () => {
      setPreviewSource(reader.result);
    };
  };
  const handleSubmitFile = (userId) => {
    if (!previewSource) return;
    uploadImage(previewSource, userId);
  };
  const uploadImage = async (base64EncodedImage, userId) => {
    try {
      await fetch(`/api/upload?userId=${userId}`, {
        method: "POST",
        body: JSON.stringify({ data: base64EncodedImage }),
        headers: { "Content-type": "application/json" },
      });
    } catch (error) {
      console.log(error);
    }
  };

  const [previewSourceProduct, setPreviewSourceProduct] = useState();
  const handleProductFileInputChange = (e) => {
    const file = e.target.files[0];
    previewProductFile(file);
  };
  const previewProductFile = (file) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onloadend = () => {
      setPreviewSourceProduct(reader.result);
    };
  };
  const handleSubmitFileProduct = (productId) => {
    if (!previewSourceProduct) return;
    uploadProduct(previewSourceProduct, productId);
  };
  const uploadProduct = async (base64EncodedImage, productId) => {
    try {
      await fetch(`/api/uploadProduct?productId=${productId}`, {
        method: "POST",
        body: JSON.stringify({ data: base64EncodedImage }),
        headers: { "Content-type": "application/json" },
      });
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Router>
      <Navbar expand="lg">
        <Container className="nav-bar">
          <Navbar.Brand>
            {" "}
            <Link to="/">
              <img className="logo" alt="agora-logo" src={image}></img>
            </Link>{" "}
          </Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse
            id="basic-navbar-nav"
            className="justify-content-end"
          >
            <Nav className="">
              {isAuth ? (
                <div className="d-flex justify-end ">
                  {user ? (
                    <span className="user-name-nav me-5">
                      Hey, {name}!
                    </span>
                  ) : null}
                  &nbsp;
                  <span className="me-4">
                    <Link to="/user/dashboard">My Account</Link>&nbsp;
                  </span>
                  <span className="me-4">
                    <Link to="/logout" onClick={onLogoutHandler}>
                      Logout
                    </Link>{" "}
                  </span>
                  <span className="cart-number">
                    <Link to="/cart">My cart: {counter}</Link>&nbsp;
                  </span>
                </div>
              ) : (
                <div>
                  <Link to="/signin"> Sign In </Link>&nbsp;&nbsp;&nbsp;
                  <Link to="/signup"> Sign Up </Link>&nbsp;&nbsp;&nbsp;
                </div>
              )}
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>

        <Routes>
          {/* <Route path="/" element={<Home />}></Route> */}
          <Route
            path="/*"
            element={<Home user={user} product={products} />}
          ></Route>
          <Route path="/search" element={<SearchResults />}></Route>
          <Route
            path="/signin"
            element={<Signin login={loginHandler} />}
          ></Route>
          <Route
            path="/signup"
            element={
              <Signup
                register={registerHandler}
                handleFileInputChange={handleFileInputChange}
                previewSource={previewSource}
              />
            }
          ></Route>
          <Route
            path="/productlist/*"
            element={
              <ProductList user={user} products={products} buyItem={buyItem} />
            }
          ></Route>
          <Route
            path="/product/:productId/*"
            element={
              <Product
                product={products}
                user={user}
                buyItem={buyItem}
                counterUp={counterUp}
                loadProductList={loadProductList}
              />
            }
          ></Route>
          <Route
            path="/addproduct"
            element={<ProductCreateForm loadProductList={loadProductList} />}
          ></Route>
          <Route
            path="/user/dashboard"
            element={
              <UserDashboard
                user={user}
                products={products}
                handleFileInputChange={handleFileInputChange}
                previewSourceProduct={previewSourceProduct}
                handleProductFileInputChange={handleProductFileInputChange}
                previewProductFile={previewProductFile}
                handleSubmitFileProduct={handleSubmitFileProduct}
                loadProductList={loadProductList}
                seller={isSeller}
              />
            }
          ></Route>
          <Route
            path="/cart"
            element={
              <Cart
                user={user}
                products={products}
                counterDown={counterDown}
                setCounter={setCounter}
              />
            }
          />
          <Route path="/logout" user={user} product={products}></Route>
        </Routes>

      <footer>
        <div className=" d-flex container">
          <div className="col-3">
            <img className="logo" alt="agora-logo" src="AGORA-LOGO.png"></img>
          </div>
          <div className="col-3">
            {isAuth ? (
              <>
                {" "}
                <Link to="/user/dashboard"> User Dashboard </Link>
              </>
            ) : (
              ""
            )}
<br />
            {isAuth && isSeller ? (
              <>
                {" "}
                <Link to="/addproduct"> Add a Product </Link>
              </>
            ) : (
              ""
            )}
          </div>
          <div className="col-3">
            <a href="/">Link 1</a>
            <br></br>
            <a href="/">Link 2</a>
            <br></br>
            <a href="/">Link 3</a>
          </div>
          <div className="col-3">
            <a href="/">Link 1</a>
            <br></br>
            <a href="/">Link 2</a>
            <br></br>
            <a href="/">Link 3</a>
          </div>
        </div>
        <p className="footer-text">
          Built by Ellinha, Sashinha, Milinhos e Claudinha 2022 - This text will
          be updated.
        </p>
      </footer>
    </Router>
  );
}
