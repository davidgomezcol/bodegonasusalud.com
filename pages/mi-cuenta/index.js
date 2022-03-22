import {useRouter} from "next/router";
import {useDispatch, useSelector} from "react-redux";
import {clearState, fetchUserBytoken, userSelector} from "../../store/users-slice";
import {Fragment, useEffect, useState} from "react";
import Spinner from "../../components/UI/Spinner";
import classes from '../../components/UI/Spinner.module.css'
import Link from "next/link";

const MiCuenta = (props) => {
    const router = useRouter();
    const dispatch = useDispatch();
    const {name, isFetching, isError} = useSelector(userSelector);

    // console.log(props.orders);
    // console.log(props.products);
    // console.log(props.productsInfo);

    useEffect(() => {
        if (localStorage.getItem('token')) {
            dispatch(fetchUserBytoken(
                {token: localStorage.getItem('token')}
            ));
        } else {
            router.push('/login')
        }
    }, []);

    useEffect(() => {
        if (isError) {
            dispatch(clearState());
            router.push('/login');
        }
    }, [isError]);

    return (
        <div className="row justify-content-center">
            {isFetching ?
                <div className={classes['pos-center']}><Spinner/></div> : isError ? "" : (
                    <Fragment>
                        <div className="col-md-12 text-center">
                            <h1>Bienvenido a tu Cuenta {name}</h1>
                        </div>
                        <div className="col-md-12 text-center">
                            <p>Aqui puedes visualizar los detalles de tu cuenta</p>
                        </div>

                        <div className="row justify-content-center mt-5">
                            {props.orders.length === 0 && <p className="text-center mb-5 fw-bolder">Aún no tienes Ordenes.</p>}
                            {props.orders.map(order => (
                                <Fragment key={order.id}>
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
                                    "
                                    >
                                        <div className="col-md-3">
                                            <span>PEDIDO REALIZADO</span>
                                            <p>{order.order_date}</p>
                                        </div>
                                        <div className="col-md-4">
                                            <span>ENVIAR A</span>
                                            <p>{order.user}</p>
                                        </div>
                                        <div className="col-md-5 text-sm-end">
                                            <span>PEDIDO N.º </span>
                                            {order.tracking_number}
                                        </div>
                                    </div>
                                    <div className="col-md-10 table-responsive">
                                        <div className="py-2 row">
                                            <div className="col-md-6 fw-bold"><span>Estatus: {order.order_status}</span></div>
                                            <div className="col-md-6 text-end fw-bold">Método de Pago: {order.payment_mode}</div>
                                        </div>
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
                                            <tbody>
                                            {order.order_items.map(orderItem => {
                                                return props.productsInfo.map(item => {
                                                    if (orderItem.product === item.id) {
                                                        return (
                                                            <tr>
                                                                <th><img
                                                                    alt={item.name} width="100px"
                                                                    src={item.image}/></th>
                                                                <td style={{verticalAlign: "middle"}}>
                                                                    {item.name} {item.weight}{item.units}<br/>
                                                                    <Link
                                                                        href={`/productos/${item.category[0].name.toLowerCase()}/${item.name.toLowerCase().replaceAll(' ', "-")}`}>
                                                                        Ver Producto
                                                                    </Link>
                                                                </td>
                                                                <td style={{verticalAlign: "middle", textAlign: "center"}}>
                                                                    {orderItem.quantity}<br/>
                                                                </td>
                                                                <td style={{verticalAlign: "middle", textAlign: "center"}}>
                                                                    ${item.price.toFixed(2)}<br/>
                                                                </td>
                                                                <td style={{verticalAlign: "middle", textAlign: "center"}}>
                                                                    ${orderItem.total_price.toFixed(2)}<br/>
                                                                </td>
                                                            </tr>
                                                        )
                                                    }
                                                })
                                            })}
                                            </tbody>
                                        </table>
                                        <div className="row">Total de la Orden: ${order.order_total.toFixed(2)}</div>
                                    </div>
                                </Fragment>
                            ))}
                        </div>
                    </Fragment>
                )}
        </div>
    );
};

export default MiCuenta;

export async function getStaticProps({params}) {
    let products = [];
    let productList = [];
    let productsInfo = [];
    const apiUrl = process.env.API_URL;
    const resOrders = await fetch(apiUrl + 'orders/', {
        headers: new Headers({
            'Content-Type': 'application/json',
            'Authorization': 'Token 86e241fafff7c98c7082b0cb25233b2d61405c50'
        })
    });
    const orders = await resOrders.json();

    orders.map(order => {
        order.order_items.map(orderItem => {
            products.push({product: orderItem.product, order: orderItem.order})
        })
        return products
    });

    products.map(product => {
        if (!productList.includes(product.product)) {
            productList.push(product.product);
        }
        return productList
    })

    for (let x = products.length; x--;) {
        const resProducts = await fetch(apiUrl + `products/${productList[x]}/`, {
            headers: new Headers({
                'Content-Type': 'application/json',
                'Authorization': process.env.TOKEN
            })
        });

        const itemsProducts = await resProducts.json();
        productsInfo.push(itemsProducts);
    }

    return {
        props: {
            orders,
            products,
            productsInfo
        },
    }
}
