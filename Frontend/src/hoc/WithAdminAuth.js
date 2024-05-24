
import useAdminAuth from "../customHooks/useAdminAuth";


const WithAdminAuth = props => useAdminAuth(props) && props.children;

export default WithAdminAuth;