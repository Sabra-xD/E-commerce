
import Button from "../Form/Button/index.js"


const LoadMore = ({
    onLoadMoreEvt = () => { },
})=>{
    return(
        <Button style={{"marginTop":"10px"}} onClick={() => onLoadMoreEvt()}>
        Load More
      </Button>
    )
}

export default LoadMore;