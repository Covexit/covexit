import React, { useState } from 'react'
import './Cart.scss'
// import '../Button/Button.scss'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faShoppingCart, faMinusCircle } from '@fortawesome/free-solid-svg-icons'
import { makeStyles } from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import Button from '@material-ui/core/Button';
import List from '@material-ui/core/List';
import Divider from '@material-ui/core/Divider';
import ListItem from '@material-ui/core/ListItem';
import ProductItem from '../ProductItem/ProductItem'




const useStyles = makeStyles({
    list: {
        width: 250,
    },
    fullList: {
        width: 'auto',
    },
});



const Cart = () => {

    // const productIcon = {
    //     remove: penIcon
    // }

    const [state, setState] = React.useState({
        bottom: false,
        // itemCount: 0
    });

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

                <ListItem button >
                    <ProductItem />
                    {/* <FontAwesomeIcon icon={faMinusCircle} /> */}
                    <img class="medium-icon" src="/static/media/rounded_plus.f80afa5e.svg" alt="add product"></img>
                </ListItem>

            </List>
            <Divider />
            <div className='cartSpace'>
                <List>
                    <ListItem button >
                    </ListItem>

                </List>
            </div>
            <Divider />
            <List>

                <ListItem button >
                    <h4 className='total'>Total:</h4>
                </ListItem>
                <div className='cartBtnContainer'>
                    <button className='cartBtn'>Buy Now</button>
                </div>
            </List>
        </div>
    );

    return (
        <div className='shoppingcart-container'>
            {['bottom'].map((anchor) => (
                <React.Fragment key={anchor}>
                    <Button onClick={toggleDrawer(anchor, true)}>
                        <h4 className='shoppingcart-title'>
                            <FontAwesomeIcon icon={faShoppingCart} />
                            Shopping Cart()
                        </h4>

                    </Button>
                    <Drawer anchor={anchor} open={state[anchor]} onClose={toggleDrawer(anchor, false)}>
                        {list(anchor)}
                    </Drawer>
                </React.Fragment>
            ))}
        </div>
    );


    // return (
    //     <div className='shoppingcart-container'>
    //         <button>
    //             <h4 className='shoppingcart-title'>
    //                 <FontAwesomeIcon icon={faShoppingCart} />
    //                 Shopping Cart({itemCount})
    //                 </h4>
    //         </button>

    //     </div>
    // )

}

export default Cart;