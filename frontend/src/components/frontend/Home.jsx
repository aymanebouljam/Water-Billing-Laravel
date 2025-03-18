import Logo from '../../assets/images/logo.png'
function Home(){
    return(
        <>
            <div className='flex justify-center home w-full h-full'>
                <img src={Logo} alt="logo" className='mt-10 ms-20 w-80 h-80' />
            </div>
        </>
    )
}
export default Home