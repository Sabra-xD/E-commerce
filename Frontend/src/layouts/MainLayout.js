import Header from "../components/Header";


const MainLayout = props => {
    return(
      <>
        <Header />

        {props.children}


      </>
    )
}


export default MainLayout;