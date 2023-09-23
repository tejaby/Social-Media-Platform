// hooks
import UseSvgLoader from "../../hooks/useSvgLoader";

function UserProfile() {
  return (
    <div className="relative max-w-3xl mx-auto my-3">
      <div className="flex justify-between items-center text-sm">
        <button>
          <UseSvgLoader options={{ width: "32px", height: "32px" }} />
        </button>
        <a href="#" className="flex gap-1 items-center">
          <span className="font-bold">yostin tejaxun</span>
          <UseSvgLoader
            name="chevron-down"
            options={{ width: "32px", height: "32px" }}
          />
        </a>
        <button>
          <UseSvgLoader
            name="menu-2"
            options={{ width: "32px", height: "32px" }}
          />
        </button>
      </div>

      <div className="flex flex-col justify-center items-center my-5">
        <div
          className="w-16 h-16 bg-cover bg-center bg-no-repeat rounded-full"
          style={{
            backgroundImage:
              "url('https://images.unsplash.com/photo-1552058544-f2b08422138a?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1599&q=80')",
          }}
        ></div>
        <span className="my-3">@yostintejaby</span>
        <div className="flex gap-10 text-sm">
          <div className="flex flex-col items-center">
            <span className="font-bold">10</span>
            <span>Post</span>
          </div>
          <div className="flex flex-col items-center">
            <span className="font-bold">1.20 K</span>
            <span>seguidores</span>
          </div>
          <div className="flex flex-col items-center">
            <span className="font-bold">300</span>
            <span>seguidos</span>
          </div>
        </div>
        <button className="my-5 py-2 px-3 font-semibold text-sm border rounded border-primary">
          Editar perfil
        </button>
        <p className="mb-3">not dark yet</p>
      </div>
    </div>
  );
}

export default UserProfile;
