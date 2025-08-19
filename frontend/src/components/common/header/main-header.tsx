import HeaderLogo from "./header-logo";
import HeaderNav from "./header-nav";

export default function MainHeader() {
  return (
    <header>
      <div className="container">
        <div className="main_header">
          <div className="flex items-center gap-6">
            <div>
              <HeaderLogo size={60} />
            </div>
            <div className="flex-1 flex justify-center">
              <HeaderNav />
            </div>
            <div>Actions</div>
          </div>
        </div>
      </div>
    </header>
  );
}
