import Logo from '../../assets/images/logo.png'
function Home(){
    return(
        <>
            <div className='h-full w-full flex justify-center items-center  p-24 home'>
                <img src={Logo} alt="logo" className='w-80 h-80' />
            </div>
        </>
    )
}
export default Home