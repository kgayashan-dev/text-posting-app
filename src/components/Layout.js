import Nav from "./Nav";

export default function Layout({children}) {
    return(
        <div className="mx-6 my-6 md:mx-2xl md-mx-auto font-poppins" >
            <Nav/>
            <main>{children}</main>
        </div>
    )
}