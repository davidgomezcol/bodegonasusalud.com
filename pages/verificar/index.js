import {useDispatch, useSelector} from "react-redux";
import {Fragment, useEffect, useState} from "react";
import Link from "next/link";
import {cartActions} from "../../store/cart-slice";
import {Form} from "react-bootstrap"
import {useRouter} from "next/router";

const Verificar = (props) => {
    const router = useRouter();
    const dispatch = useDispatch();
    const [paymentSelected, setPaymentSelected] = useState('');
    const cartItems = useSelector((state) => state.cart.items);
    const {cartTotalQuantity, cartTotalAmount} = useSelector(state => state.cart);

    const removeItemHandler = (id) => {
        dispatch(cartActions.removeItemFromCart(id));
    }

    const addItemHandler = (id, price) => {
        return dispatch(
            cartActions.addItemToCart({
                id, price
            })
        );
    };

    const selectPaymentHandler = (e) => {
        setPaymentSelected(e.target.value);
    }

    async function createOrder() {
        const response = await fetch('http://localhost/api/orders/', {
            method: 'POST',
            body: JSON.stringify({
                payment_mode: paymentSelected,
                order_items: cartItems.map(item => (
                    {
                        product: item.id,
                        quantity: item.quantity
                    }
                )),
            }),
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Token ' + localStorage.getItem('token')
            }
        });

        await response.json();

        if (response.ok) {
            localStorage.removeItem('cartItems')
            router.push('/')
        }
    }

    return (
        <Fragment>
            <div className="row justify-content-center mt-5">
                <h1 className="text-center">Verifica tu Compra</h1>
                <div
                    className="
                                        col-md-10
                                        border-dark
                                        border
                                        border-bottom-1
                                        bord
                                        bg-dark
                                        bg-opacity-25
                                        mt-3
                                        d-inline-flex
                                        rounded-top
                                        align-items-center
                                        mt-5
                                    "
                >
                </div>
                <div className="col-md-10 table-responsive">
                    <table className="table table-hover">
                        <thead>
                        <tr>
                            <th scope="col"></th>
                            <th scope="col">Producto</th>
                            <th scope="col" className="text-center">Cantidad</th>
                            <th scope="col" className="text-center">Precio Unitario</th>
                            <th scope="col" className="text-center">Precio Total</th>
                        </tr>
                        </thead>
                        {cartItems.map(item => (
                            <Fragment key={item.id}>

                                <tbody>
                                <tr>
                                    <th>
                                        <img width="100px" src={item.image}/>
                                    </th>
                                    <td style={{verticalAlign: "middle"}}>
                                        {item.name} {item.weight}{item.units}<br/>
                                    </td>
                                    <td style={{verticalAlign: "middle", textAlign: "center"}}>
                                        {item.quantity}<br/>
                                    </td>
                                    <td style={{verticalAlign: "middle", textAlign: "center"}}>
                                        ${item.price.toFixed(2)}<br/>
                                    </td>
                                    <td style={{verticalAlign: "middle", textAlign: "center"}}>
                                        ${item.totalPrice.toFixed(2)}<br/>
                                    </td>
                                    <td style={{verticalAlign: "middle", textAlign: "center"}}>
                                        <button onClick={removeItemHandler.bind(this, item.id)}>-</button>
                                        <button onClick={addItemHandler.bind(this, item.id, item.price)}>+</button>
                                    </td>
                                </tr>
                                </tbody>

                            </Fragment>
                        ))}
                    </table>
                    <div className="row mt-5">
                        <div className="col-md-12 mt-3">
                            <span className="fw-bolder">Cantidad de Artículos:</span> {cartTotalQuantity}
                        </div>
                        <div className="col-md-12">
                            <span className="fw-bolder">Total de la Orden:</span> ${cartTotalAmount.toFixed(2)}
                        </div>
                        <div className="col-md-4 mt-5">
                            <span className="fw-bolder">Selecciona el Método de Pago</span>
                            <Form.Select onChange={selectPaymentHandler} className="mt-2"
                                         aria-label="Default select example" size="sm">
                                <option>Selecciona un método de pago</option>
                                <option value={"Tarjeta de Crédito"}>Tarjeta de Crédito</option>
                                <option value={"Débito"}>Débito</option>
                                <option value={"Zelle"}>Zelle</option>
                                <option value={"Banesco Panamá"}>Banesco Panamá</option>
                            </Form.Select>
                        </div>
                        <div className="col-md-12 mt-5 mb-5">
                            <button onClick={createOrder} className="btn btn-primary btn-dark">Enviar</button>
                        </div>
                    </div>
                </div>
            </div>
        </Fragment>
    )
}

export default Verificar;
