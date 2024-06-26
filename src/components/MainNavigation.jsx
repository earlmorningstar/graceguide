import "./MainNavigation.css"

function MainNavigation({title, children}) {
    return(<>
    <nav className="navbar">
      <p>{title}</p>
      <div className="navDiv">
        <span>{children}</span>
      </div>
    </nav></>)
}


export default MainNavigation;