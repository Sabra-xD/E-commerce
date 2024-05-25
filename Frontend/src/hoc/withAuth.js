import useAuth from "../customHooks/useAuth";



const WithAuth = props => useAuth(props) && props.children;

export default WithAuth;