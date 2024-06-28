import { FadeLoader } from 'react-spinners';

function LoadingComponent({isLoading, children}) {
    return (
        isLoading ? (
          <div className="fadeloader">
            <FadeLoader size={80} color={"#c9ce8c"} loading={isLoading} speedMultiplier={2} />
          </div>
        ) : (
          children
        )
      );
}


export default LoadingComponent;