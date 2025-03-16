import Logo from '../../../assets/images/logo.png'
function Home(){
    return(
        <>
            <div className='w-full h-full flex justify-center items-center'>
                <img src={Logo} alt="logo" className='w-80 h-80' />
            </div>
        </>
    )
}
export default Home