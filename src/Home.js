import React from "react";
import Search from "./components/Search";
import Slider from "./components/Slider";
import Categories from "./components/Categories";

export default function Home(props) {

  return (
    <div>
      <div className="hero">
        <div>
          <div className="buy-sell-background">
            <div>
              <h1 className="buy-sell-title">Buy and Sell Anything</h1>{" "}
              <br></br>
              <h2 className="buy-sell-subtitle">Whatever it is. Use Agora.</h2>
            </div>
          </div>
          <Search search={props.search}></Search>
        </div>
      </div>
      <Slider heading="Example Slider" slides={props.product} />
      <Categories></Categories>
    </div>
  );
}
