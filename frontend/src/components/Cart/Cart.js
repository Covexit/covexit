import React, { useState } from 'react'
import './Cart.scss'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faShoppingCart } from '@fortawesome/free-solid-svg-icons'
import Drawer from '@material-ui/core/Drawer';
import Button from '@material-ui/core/Button';
import List from '@material-ui/core/List';
import Divider from '@material-ui/core/Divider';
import ListItem from '@material-ui/core/ListItem';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import { useCartContext } from '../../context/CartContext'



const Cart = ({ product, type }) => {
    const { delProduct, updateProduct, total, cart } = useCartContext()

    console.log('cart:', cart)


    const [state, setState] = React.useState({
        bottom: false,
        // selectedValue: ''
    });

    const handleChange = (event) => {
        const value = updateProduct(event.target.value);
        // setState({ selectedValue: value });
    };

    const toggleDrawer = (anchor, open) => (event) => {
        if (event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
            return;
        }

        setState({ ...state, [anchor]: open });
    };


    const list = (anchor) => (
        <div
            role="presentation"
            onClick={toggleDrawer(anchor, false)}
            onKeyDown={toggleDrawer(anchor, false)}
        >

            <List>

                {cart.map(item => {
                    return (
                        <div className="Product-item">
                            <ListItem>

                                <div key={item.id} className="Product-content">
                                    <img className="Product-img" src={item.image} alt="product" />
                                    <div className="Product-review">
                                        <h4>{item.name}</h4>
                                        <p>{item.description}</p>
                                        <h4 className="variant-price">{item.price}€</h4>

                                        <FormControl variant="outlined">
                                            <InputLabel id="demo-simple-select-outlined-label" className='label'>
                                                <div className='stk'>
                                                    Stk: {item.quantity}
                                                </div>
                                            </InputLabel>
                                            <Select
                                                labelId="demo-simple-select-outlined-label"
                                                id="demo-simple-select-outlined"
                                                label="Age"
                                                value={state.selectedValue}
                                                onChange={handleChange}
                                            >
                                                <MenuItem value={item.quantity}>{item.quantity}</MenuItem>
                                                <MenuItem value={item.quantity + 1}>{item.quantity + 1}</MenuItem>
                                                <MenuItem value={item.quantity + 2}>{item.quantity + 2}</MenuItem>
                                                <MenuItem value={item.quantity + 3}>{item.quantity + 3}</MenuItem>
                                                <MenuItem value={item.quantity + 4}>{item.quantity + 4}</MenuItem>
                                            </Select>
                                        </FormControl>
                                    </div>
                                    <div className='circle' onClick={() => delProduct(item.id)} alt="add product">
                                    </div>
                                </div>

                            </ListItem>
                        </div>
                    )
                })}


            </List>
            <Divider />
            <List>

                <ListItem button >
                    <div className='total-checkout'>
                        <div className='total-title'>
                            <h4>Total:</h4>
                        </div>
                        <div className='total'>
                            {cart.length ? <h4>{total}€</h4> : <h4>{0}€</h4>}
                        </div>
                        <div className='percent'>
                            <p>incl. 19% VAT</p>
                        </div>
                    </div>

                </ListItem>
                <div className='cartBtnContainer'>
                    <button className='cartBtn'>Buy Now</button>
                </div>
            </List>
        </div>
    );

    if (cart.length === 0) {
        return (
            <div className='shoppingcart-container'>
                {['bottom'].map((anchor) => (
                    <React.Fragment key={anchor}>
                        <Button onClick={toggleDrawer(anchor, true)}>
                            <h4 className='shoppingcart-title'>
                                <FontAwesomeIcon icon={faShoppingCart} />
                                Your cart is empty!
                        </h4>

                        </Button>
                        <Drawer anchor={anchor} open={state[anchor]} onClose={toggleDrawer(anchor, false)}>
                            {list(anchor)}
                        </Drawer>
                    </React.Fragment>
                ))}
            </div>
        )
    } else {
        return (
            <div className='shoppingcart-container'>
                {['bottom'].map((anchor) => (
                    <React.Fragment key={anchor}>
                        <Button onClick={toggleDrawer(anchor, true)}>
                            <h4 className='shoppingcart-title'>
                                <FontAwesomeIcon icon={faShoppingCart} />
                                Shopping Cart({cart.length})
                        </h4>

                        </Button>
                        <Drawer anchor={anchor} open={state[anchor]} onClose={toggleDrawer(anchor, false)}>
                            {list(anchor)}
                        </Drawer>
                    </React.Fragment>
                ))}
            </div>
        )
    }

}

export default Cart;