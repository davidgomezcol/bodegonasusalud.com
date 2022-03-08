import Link from "next/link";
import {useRouter} from "next/router";
import {useDispatch, useSelector} from "react-redux";
import {clearState, fetchUserBytoken, userSelector} from "../../store/users-slice";
import {Fragment, useEffect, useState} from "react";
import Spinner from "../../components/UI/Spinner";
import classes from '../../components/UI/Spinner.module.css'

const MiCuenta = (props) => {
    const router = useRouter();
    const dispatch = useDispatch();
    const {name, isFetching, isError} = useSelector(userSelector);

    // console.log(props.orders);
    // console.log(props.products);
    console.log(props.productsInfo);

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

    // const onLogOut = () => {
    //     localStorage.removeItem('token');
    //     router.push('/login');
    // };

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
                            {props.orders.map(order => (
                                <Fragment key={order.id}>
                                    <div
                                        key={order.id}
                                        className="
                                        col-md-8
                                        border-dark
                                        border
                                        border-bottom-1
                                        bord
                                        bg-dark
                                        bg-opacity-25
                                        mt-3
                                        d-inline-flex
                                        rounded-top
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
                                        <div className="col-md-4 text">
                                            <span>PEDIDO N.º </span>
                                            {order.tracking_number}
                                        </div>
                                    </div>
                                    <div className="col-md-8 border border-1 border-top-0 border-dark rounded-bottom">
                                        <div className="py-2 col-md-4">
                                            <span>Estatus: {order.order_status}</span>
                                        </div>
                                        {props.products.map(orderItem => {
                                            console.log("order id", orderItem.order, order.id)
                                            if (orderItem.order === order.id) {
                                                return props.productsInfo.map(image => (
                                                            <p><img width="100px" src={image.image}/></p>
                                                        )
                                                    )
                                            }
                                        })}

                                        {/*{order.order_items.map(orderItem => (*/}
                                        {/*    <p key={orderItem.id}>{orderItem.quantity}</p>*/}
                                        {/*))}*/}
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
    const resOrders = await fetch('http://localhost:8000/api/orders/', {
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
        productList.push(product.product)
        return productList
    })

    for (let x = products.length; x--;) {
        const resProducts = await fetch(`http://localhost:8000/api/products/${productList[x]}/`, {
            headers: new Headers({
                'Content-Type': 'application/json',
                'Authorization': 'Token ca26bcf85be14daedb6a636af5590638e559293c'
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
