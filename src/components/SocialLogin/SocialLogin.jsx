import { FaGoogle } from "react-icons/fa";
import useAuth from "../../hooks/useAuth";
import useAxiosPublic from "../../hooks/useAxiosPublic";
import { useNavigate } from "react-router-dom";


const SocialLogin = () => {
    const { googleSignIn } = useAuth();
    const axiosPublic = useAxiosPublic();

    const navigate = useNavigate();

    const handleGoogleSignIn = () => {

        googleSignIn()
            .then(result => {
                const userInfo = {
                    email: result.user?.email,
                    name: result.user?.displayName
                }

                axiosPublic.post('/users', userInfo)
                    .then(res => {
                        navigate('/')
                })
        })
    }
    return (
        <div className="mx-8 py-2">
            <div className="divider"></div>
        <div>
          <button onClick={handleGoogleSignIn} className="btn btn-primary ">
           <FaGoogle className="mr-2"></FaGoogle>
            Google
          </button>
        </div>
      </div>
    );
};

export default SocialLogin;