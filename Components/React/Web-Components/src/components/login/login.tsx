import {SubmitHandler, useForm} from "react-hook-form";

export type Inputs = {
    username: string,
    password: string
}

interface LoginProps {
    onLogin?: (credentials: Inputs) => void
}

export function Login(props: LoginProps) {
    const {
        register,
        handleSubmit,
        formState: { errors, isDirty, isValid }
    } = useForm<Inputs>({mode: 'onChange'});

    const onSubmit: SubmitHandler<Inputs> = (data) => {
        if (props.onLogin) {
            props.onLogin(data);
        }
        console.log(data);
    }

    return (
        <div className="login-control">
            <form onSubmit={handleSubmit(onSubmit)}>
                <div>
                    <label>Username</label>
                    <input {...register("username", {
                        required: true, minLength: 10
                    })} />
                </div>
                <div>
                    <label>Password</label>
                    <input type="password" {...register("password",
                        {required: true, minLength: 10})} />
                </div>
                <div>
                    <input type="submit" value="login" disabled={!isDirty || !isValid}></input>
                </div>
                { errors.password &&
                    <span>{errors.password.message}</span>
                }
            </form>
        </div>
    )
}
