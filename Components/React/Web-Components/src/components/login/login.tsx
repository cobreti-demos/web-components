import {SubmitHandler, useForm} from "react-hook-form";

type Inputs = {
    username: string,
    password: string
}

export function Login() {
    const {
        register,
        handleSubmit,
        formState: { isDirty, isValid }
    } = useForm<Inputs>({mode: 'onChange'});

    const onSubmit: SubmitHandler<Inputs> = (data) => {
        console.log(data);
    }

    return (
        <div className="login-control">
            <form onSubmit={handleSubmit(onSubmit)}>
                <div>
                    <label>Username</label>
                    <input {...register("username", {required: true, minLength: 10})} />
                </div>
                <div>
                    <label>Password</label>
                    <input type="password" {...register("password", {required: true, minLength: 10})} />
                </div>
                <div>
                    <input type="submit" value="login" disabled={!isDirty || !isValid}></input>
                </div>
            </form>
        </div>
    )
}
