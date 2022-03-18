import {useEffect, useState, Fragment} from "react";
import {useForm} from 'react-hook-form';
import {useSelector, useDispatch} from "react-redux";
import {useRouter} from "next/router";
import toast, {Toaster} from 'react-hot-toast';
import {clearState, signupUser, userSelector} from "../../store/users-slice";
import Spinner from "react-bootstrap/Spinner";

const Registro = () => {
    const dispatch = useDispatch();
    const router = useRouter();
    const {register, errors, handleSubmit} = useForm();

    const {isFetching, isSuccess, isError, errorMessage} = useSelector(
        userSelector
    );
    const onSubmit = (data) => {
        dispatch(signupUser(data));
    }

    useEffect(() => {
        return () => {
            dispatch(clearState());
        };
    }, [dispatch]);

    useEffect(() => {
        if (isSuccess) {
            dispatch(clearState());
            toast.success(
                "Ya estas registrado!. Te invitamos a iniciar sesión.",
                {
                    duration: 2000, ariaProps: {
                        role: 'status',
                        'aria-live': 'polite',
                    },
                })
            setTimeout(() => {
                router.push('/login');
            }, 2000)
        }
        if (isError) {
            toast.error(errorMessage, {duration: 4000})
            dispatch(clearState());
        }
    }, [dispatch, errorMessage, isSuccess, isError]);

    return (
        <div className="row justify-content-center">
            <Toaster
                position="top-center"
                reverseOrder={false}
            />
            <div className="col-md-12 text-center">
                <h1>Registrate</h1>
            </div>
            <div className="col-md-6">
                <form className="bg-light p-5 mt-5 mb-5" onSubmit={handleSubmit(onSubmit)}>
                    <h3>Crea Una Cuenta</h3>
                    <div className="form-group">
                        <label className="form-label mt-5" htmlFor='first_name'>
                            <strong>First Name*</strong>
                        </label>
                        <input
                            className='form-control'
                            type="text"
                            name="first_name"
                            placeholder="First Name*"
                            {...register("first_name", {required: true})}
                            // value={first_name}
                            required
                        />
                    </div>
                    <div className="form-group">
                        <label className="form-label mt-3" htmlFor='last_name'>
                            <strong>Last Name*</strong>
                        </label>
                        <input
                            className='form-control'
                            type="text"
                            name="last_name"
                            placeholder="Last Name*"
                            {...register("last_name", {required: true})}
                            // value={last_name}
                            required
                        />
                    </div>
                    <div className="form-group">
                        <label className="form-label mt-3" htmlFor='email'>
                            <strong>Dirección de Email*</strong>
                        </label>
                        <input
                            className='form-control'
                            type="email"
                            name="email"
                            placeholder="Dirección de Email*"
                            {...register("email", {
                                pattern: /^[a-zA-Z0-9+_.-]+@[a-zA-Z0-9.-]+$/i,
                            })}
                            // value={email}
                            required
                        />
                    </div>
                    <div className="form-group">
                        <label className="form-label mt-3" htmlFor='password'>
                            <strong>Contraseña*</strong>
                        </label>
                        <input
                            className='form-control'
                            type="password"
                            name="password"
                            placeholder="Contraseña*"
                            minLength='8'
                            {...register("password", {required: true})}
                            // value={password}
                            required
                        />
                    </div>
                    {/*<div className="form-group">*/}
                    {/*    <label className="form-label mt-3" htmlFor='re_password'>*/}
                    {/*        <strong>Confirma la Contraseña*</strong>*/}
                    {/*    </label>*/}
                    {/*    <input*/}
                    {/*        className='form-control'*/}
                    {/*        type="password"*/}
                    {/*        name="re_password"*/}
                    {/*        placeholder="Confirma la Contraseña*"*/}
                    {/*        onChange={onChange}*/}
                    {/*        minLength='8'*/}
                    {/*        value={re_password}*/}
                    {/*        required*/}
                    {/*    />*/}
                    {/*</div>*/}

                    <button type="submit" className="btn btn-dark mt-5">
                        Registrarme
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

export default Registro;