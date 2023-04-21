import { Formik } from "formik";
import { useNavigate } from "react-router-dom";
import { useRegisterUserMutation } from "../store/features/user/UserRequest";

const Register = () => {
  const [registerUser] = useRegisterUserMutation();
  const navigate = useNavigate();

  return (
    <>
      <div className=" ">
        <div className="mx-auto w-full sm:max-w-screen-sm md:max-w-screen-md lg:max-w-screen-lg xl:max-w-screen-xl">
          <div className="mx-2 py-12 text-center md:mx-auto md:w-2/3 md:py-20">
            <h1 className="mb-4 text-xl font-black leading-4 sm:text-3xl xl:text-3xl">
              Register
            </h1>
          </div>
        </div>
      </div>
      <div className="md:w-2/3 mx-auto w-full pb-16 sm:max-w-screen-sm md:max-w-screen-md lg:w-1/3 lg:max-w-screen-lg xl:max-w-screen-xl">
        <Formik
          initialValues={{ password: "", email: "", name: "" }}
          //  validationSchema={Yup.object({
          //    firstName: Yup.string()
          //      .max(15, 'Must be 15 characters or less')
          //      .required('Required'),
          //    lastName: Yup.string()
          //      .max(20, 'Must be 20 characters or less')
          //      .required('Required'),
          //    email: Yup.string().email('Invalid email address').required('Required'),
          //  })}
          onSubmit={async (values, { setSubmitting }) => {
            await registerUser(values)
              .unwrap()
              .then(() => navigate("/login"))
              .catch((err) => console.log(err));
          }}
        >
          {(formik) => (
            <form
              onSubmit={formik.handleSubmit}
              className="shadow-lg mb-4 rounded-lg border border-gray-100 py-10 px-8"
            >
              <div className="mb-4">
                <label className="mb-2 block text-sm font-bold" htmlFor="email">
                  Name
                </label>
                <input
                  className="shadow-sm w-full cursor-text appearance-none rounded border border-gray-300 py-2 px-3 leading-tight outline-none ring-blue-500 focus:ring"
                  id="name"
                  type="text"
                  placeholder="Name"
                  {...formik.getFieldProps("name")}
                />
                <span className="my-2 block"></span>
              </div>
              <div className="mb-4">
                <label className="mb-2 block text-sm font-bold" htmlFor="email">
                  E-mail
                </label>
                <input
                  className="shadow-sm w-full cursor-text appearance-none rounded border border-gray-300 py-2 px-3 leading-tight outline-none ring-blue-500 focus:ring"
                  id="email"
                  type="email"
                  placeholder="Email"
                  {...formik.getFieldProps("email")}
                />
                <span className="my-2 block"></span>
              </div>
              <div className="mb-4">
                <label
                  className="mb-2 block text-sm font-bold"
                  htmlFor="password"
                >
                  Password
                </label>
                <input
                  className="shadow-sm w-full cursor-text appearance-none rounded border border-gray-300 py-2 px-3 leading-tight outline-none ring-blue-500 focus:ring"
                  id="password"
                  type="password"
                  placeholder="******************"
                  {...formik.getFieldProps("password")}
                />
              </div>
              <div className="mb-4">
                <label
                  className="mb-2 block text-sm font-bold"
                  htmlFor="password"
                >
                  Password Confirmation
                </label>
                <input
                  className="shadow-sm w-full cursor-text appearance-none rounded border border-gray-300 py-2 px-3 leading-tight outline-none ring-blue-500 focus:ring"
                  id="password_confirmation"
                  type="password"
                  placeholder="******************"
                  {...formik.getFieldProps("password_confirmation")}
                />
              </div>
              <div className="flex items-center">
                <div className="flex-1"><p>Already have an account? <a className="text-blue-600" href="login">Login</a></p></div>
                <button
                  className="cursor-pointer rounded bg-blue-600 py-2 px-8 text-center text-lg font-bold  text-white"
                  type="submit"
                  disabled={formik.isSubmitting}
                >
                  Register
                </button>
              </div>
            </form>
          )}
        </Formik>
      </div>
    </>
  );
};

export default Register;
