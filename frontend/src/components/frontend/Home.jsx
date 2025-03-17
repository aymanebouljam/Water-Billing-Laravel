import Logo from '../../assets/images/logo.png'
function Home(){
    return(
        <>
            <div className='h-screen w-full flex justify-center  home'>
                <img src={Logo} alt="logo" className='mt-8 ms-16 w-80 h-80' />
            </div>
        </>
    )
}
export default Home