import {useDispatch, useSelector} from "react-redux";
import {useRouter} from "next/router";
import {useForm} from "react-hook-form";
import {clearState, loginUser, userSelector} from "../../store/users-slice";

import toast, {Toaster} from "react-hot-toast";
import Spinner from 'react-bootstrap/Spinner'
import Link from "next/link";
import {useEffect} from "react";

const Login = () => {
    const dispatch = useDispatch();
    const router = useRouter();
    const {register, errors, handleSubmit} = useForm();
    const {isFetching, isSuccess, isError, errorMessage} = useSelector(
        userSelector
    );

    const onSubmit = (data) => {
        dispatch(loginUser(data));
    };

    useEffect(() => {
        dispatch(clearState());
    }, []);

    useEffect(() => {
        if (isError) {
            toast.error(errorMessage);
            dispatch(clearState());
        }
        if (isSuccess) {
            dispatch(clearState());
            router.push('/');
        }
    }, [isError, isSuccess])

    return (

        <div className="row justify-content-center">
            <Toaster
                position="top-center"
                reverseOrder={false}
            />
            <div className="col-md-12 text-center">
                <h1>Mi Cuenta</h1>
            </div>
            <div className="col-md-12 text-center">
                <p>Si aún no estas registrado.
                    <Link href='/registro'>
                        <a className="text-primary fw-bolder"> Click Aquí</a>
                    </Link>
                </p>
            </div>
            <div className="col-md-4 mt-5">
                <form onSubmit={handleSubmit(onSubmit)}>
                    <div className="mb-3">
                        <label htmlFor="exampleInputEmail1" className="form-label">Dirección de Email</label>
                        <input
                            type="email"
                            className="form-control"
                            id="InputEmail"
                            aria-describedby="emailHelp"
                            name="email"
                            {...register("email",
                                {pattern: /^[a-zA-Z0-9+_.-]+@[a-zA-Z0-9.-]+$/i,})
                            }
                            required
                        />
                        <div id="emailHelp" className="form-text">Nosotros nunca compartiremos tu email con nadie.</div>
                    </div>
                    <div className="mb-3">
                        <label htmlFor="exampleInputPassword1" className="form-label">Contraseña</label>
                        <input
                            type="password"
                            className="form-control"
                            id="password"
                            name="password"
                            aria-describedby="passwordHelp"
                            {...register("password", {required: true})}
                            required
                        />
                    </div>
                    <div className="mb-3 form-check">
                        <input type="checkbox" className="form-check-input" id="exampleCheck1"/>
                        <label className="form-check-label" htmlFor="exampleCheck1">Change to Robot</label>
                    </div>
                    <button type="submit" className="btn btn-dark">
                        Iniciar Sesión
                        {isFetching ? (
                            <Spinner className="ms-1" size={"sm"} animation="border" role="status">
                                <span className="visually-hidden">Loading...</span>
                            </Spinner>
                        ) : null}
                    </button>
                </form>
            </div>
        </div>
    )
}

export default Login;