export function Card({children, title,color}){
return (
    <div className="border-2 h-fit text-center bg-white ml-2 mt-10">

    <p className={`${color} w-full h-7 text-white font-semibold`}>{title}</p>
    <div >
        {children}
    </div>
    </div>
)
}