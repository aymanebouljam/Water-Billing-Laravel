import Logo from '../../assets/images/logo2.png'
function Home(){
    return(
        <>
            <div className='flex justify-center home w-full h-full'>
                <img src={Logo} alt="logo" className='mt-60 ms-20 w-80 h-60' />
            </div>
        </>
    )
}
export default Home