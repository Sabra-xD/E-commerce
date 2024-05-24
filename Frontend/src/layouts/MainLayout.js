import Header from "../components/Header";
import Footer from "../components/Footer";


const MainLayout = props => {
    return(
      <>
        <Header />

        {props.children}

        {/* <Footer /> */}
      </>
    )
}


export default MainLayout;