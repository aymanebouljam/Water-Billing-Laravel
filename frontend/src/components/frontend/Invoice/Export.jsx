import adobe from '../../../assets/images/adobe.gif'
import excel from '../../../assets/images/excel.png'
function Export(){
    return(
        <div className="container flex justify-center items-center">
            <div className="flex items-center justify-center gap-x-16 w-1/2 h-1/2 bg-white/20  backdrop-blur-lg shadow-xl rounded-3xl  hover:animate-none">
                <img src={adobe} alt='Adobe PDf' className='w-20 h-20'/>
                <img src={excel} alt='Adobe PDf' className='w-20 h-20 animate-bounce'/>
            </div>
        </div>
    )
}
export default Export