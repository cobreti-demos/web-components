import {SubmitHandler, useForm} from "react-hook-form";
import {LoginData} from "@react-web-component/api";

interface LoginProps {
    onLogin?: (credentials: LoginData) => void
}

export function Login(props: LoginProps) {
    const {
        register,
        handleSubmit,
        formState: { isDirty, isValid }
    } = useForm<LoginData>({mode: 'onChange'});

    const onSubmit: SubmitHandler<LoginData> = (data) => {
        if (props.onLogin) {
            props.onLogin(data);
        }
    }

    return (
        <div className="login-control">
            <form onSubmit={handleSubmit(onSubmit)}>
                <div>
                    <label htmlFor="username">Username</label>
                    <input id="username" {...register("username", {
                        required: true, minLength: 10
                    })} />
                </div>
                <div>
                    <label htmlFor="password">Password</label>
                    <input id="password" type="password" {...register("password",
                        {required: true, minLength: 10})} />
                </div>
                <div>
                    <input type="submit" value="login" disabled={!isDirty || !isValid}></input>
                </div>
            </form>
        </div>
    )
}
