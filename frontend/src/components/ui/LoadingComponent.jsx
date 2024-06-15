// components
import UseSvgLoader from "./UseSvgLoader";

function LoadingComponent() {
  return (
    <div className="fixed w-full h-full top-0 left-0 flex justify-center items-center bg-white dark:bg-DarkColor">
      <UseSvgLoader name={"logo"} />
    </div>
  );
}

export default LoadingComponent;
