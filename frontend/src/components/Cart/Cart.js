import React from "react";
import "./Cart.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faShoppingCart } from "@fortawesome/free-solid-svg-icons";
import Drawer from "@material-ui/core/Drawer";
import Button from "@material-ui/core/Button";
import List from "@material-ui/core/List";
import Divider from "@material-ui/core/Divider";
import ListItem from "@material-ui/core/ListItem";
import { useCartContext } from "../../context/CartContext";
import CustomButton from "../Button/Button";

const Cart = () => {
  const { delProduct, updateProduct, total, cart } = useCartContext();

  const [state, setState] = React.useState({
    bottom: false,
  });

  const handleChange = (event, id) => {
    updateProduct(event.target.value, id);
  };

  const toggleDrawer = (anchor, open) => (event) => {
    if (
      event.type === "keydown" &&
      (event.key === "Tab" || event.key === "Shift")
    ) {
      return;
    }

    setState({ ...state, [anchor]: open });
  };

  const list = (anchor) => (
    <div role="presentation" onKeyDown={toggleDrawer(anchor, false)}>
      <List>
        {cart.map((item) => {
          return (
            <div className="Product-item">
              <ListItem>
                <div key={item.id} className="Product-content">
                  <img className="Product-img" src={item.image} alt="product" />
                  <div className="Product-review">
                    <h4>{item.name}</h4>
                    <p>{item.description}</p>
                    <h4 className="variant-price">{item.price}€</h4>
                    <div className="arrow-down"></div>
                    <select
                      className="menu"
                      label="quantity"
                      onChange={(event) => {
                        handleChange(event, item.id);
                      }}
                      handleClick={(event) => {
                        event.stopPropagation();
                        event.preventDefault();
                      }}
                    >
                      <option value={item.quantity}>
                        Stk: {item.quantity}
                      </option>
                      <option value={item.quantity + 1}>
                        Stk: {item.quantity + 1}
                      </option>
                      <option value={item.quantity + 2}>
                        Stk: {item.quantity + 2}
                      </option>
                      <option value={item.quantity + 3}>
                        Stk: {item.quantity + 3}
                      </option>
                      <option value={item.quantity + 4}>
                        Stk: {item.quantity + 4}
                      </option>
                    </select>
                  </div>
                  <div
                    className="circle"
                    onClick={() => delProduct(item.id)}
                    alt="add product"
                  ></div>
                </div>
              </ListItem>
            </div>
          );
        })}
      </List>
      <Divider />
      <List>
        <ListItem button>
          <div className="total-checkout">
            <div className="total-title">
              <h4>Total:</h4>
            </div>
            <div className="total">
              {cart.length ? <h4>{total}€</h4> : <h4>{0}€</h4>}
            </div>
            <div className="percent">
              <p>incl. 19% VAT</p>
            </div>
          </div>
        </ListItem>
        <div className="cartBtnContainer">
          <CustomButton>Buy Now</CustomButton>
        </div>
      </List>
    </div>
  );

  if (cart.length === 0) {
    return (
      <div className="shoppingcart-container">
        {["bottom"].map((anchor) => (
          <React.Fragment key={anchor}>
            <Button onClick={toggleDrawer(anchor, true)}>
              <h4 className="shoppingcart-title">
                <FontAwesomeIcon icon={faShoppingCart} />
                Your cart is empty!
              </h4>
            </Button>
            <Drawer
              anchor={anchor}
              open={state[anchor]}
              onClose={toggleDrawer(anchor, false)}
            >
              {list(anchor)}
            </Drawer>
          </React.Fragment>
        ))}
      </div>
    );
  } else {
    return (
      <div className="shoppingcart-container">
        {["bottom"].map((anchor) => (
          <React.Fragment key={anchor}>
            <Button onClick={toggleDrawer(anchor, !state[anchor].open)}>
              <h4 className="shoppingcart-title">
                <FontAwesomeIcon icon={faShoppingCart} />
                Shopping Cart({cart.length})
              </h4>
            </Button>
            <Drawer
              anchor={anchor}
              open={state[anchor]}
              onClose={toggleDrawer(anchor, false)}
            >
              {list(anchor)}
            </Drawer>
          </React.Fragment>
        ))}
      </div>
    );
  }
};

export default Cart;
