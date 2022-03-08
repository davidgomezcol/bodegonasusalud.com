import {useDispatch, useSelector} from "react-redux";
import {useRouter} from "next/router";
import {useForm} from "react-hook-form";
import {clearState, loginUser, userSelector} from "../../store/users-slice";

import toast, {Toaster} from "react-hot-toast";
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
        return () => {
            dispatch(clearState());
        };
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
                        {isFetching ? (
                            <svg
                                className="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
                                xmlns="http://www.w3.org/2000/svg"
                                fill="none"
                                viewBox="0 0 24 24"
                            >
                                <circle
                                    className="opacity-25"
                                    cx="12"
                                    cy="12"
                                    r="10"
                                    stroke="currentColor"
                                    strokeWidth="4"
                                ></circle>
                                <path
                                    className="opacity-75"
                                    fill="currentColor"
                                    d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                                ></path>
                            </svg>
                        ) : null}
                        Iniciar Sesión
                    </button>
                </form>
            </div>
        </div>
    )
}

export default Login;