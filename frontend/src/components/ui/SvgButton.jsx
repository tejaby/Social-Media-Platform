// hooks
import UseSvgLoader from "../../hooks/useSvgLoader";

function SvgButton({ name, options }) {
  return (
    <button>
      <UseSvgLoader name={name} options={options} />
    </button>
  );
}

export default SvgButton;
