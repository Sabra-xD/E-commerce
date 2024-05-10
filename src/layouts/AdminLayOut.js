import Header from "../components/Header";
import Footer from "../components/Footer";

const AdminLayOut = (props) => {
    return(
        <>
         <Header />
            {props.children}
        <Footer />
        </>
       
    )
}


export default AdminLayOut;