export default function Message({children, avatar,userName, description}) {
    return(
        <div className="bg-white p-8 border-b-2 rounded-lg">
            <div className="flex items-center">
                <img src={avatar} alt="" className="rounded-full w-10 mx-2"/>
                <h2>{userName}</h2>
            </div>

            <div className="py-4">
                <p>{description}</p>
            </div>
            {children}
        </div>
    )
}