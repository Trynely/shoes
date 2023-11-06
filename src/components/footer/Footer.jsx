import "./footer.css"

const Footer = () => {
    return (
        <div className='footer'>
            <div className='footer__container'>
                <div className='container__sm_img'>
                    <img src="/tg.png" alt="" />
                    <img src="/inst.png" alt="" />
                </div>
                
                <div className='container__footer_logo'>
                    <img src="/try-logo.png" alt="" />
                </div>
            </div>
        </div>
    )
}

export default Footer