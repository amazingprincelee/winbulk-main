"use client"
import Image from 'next/image';

interface workdata {
    imgSrc: string;
    heading: string;
    subheading: string;
    hiddenpara: string;
}

const workdata: workdata[] = [
    {
        imgSrc: '/images/Work/started1.png',
        heading: 'Get Started',
        subheading: 'actualizing your ideas. Your decision to take action is the energy you needto wheels vehicle of your ideas to fruittion',
        hiddenpara: 'give more value to your existing ideas and technology by sharing with a professional developer.',
    },
    {
        imgSrc: '/images/Work/submit1.png',
        heading: 'Submit your Idea',
        subheading: 'We serve as the vital link between your vision and a skilled developer who can bring your idea to life',
        hiddenpara: 'connecting you with experienced developers who possess the expertise and resources needed to turn your ideas into reality.',
    },
    {
        imgSrc: '/images/Work/launch.png',
        heading: 'Production',
        subheading: 'We are not only dedicated to helping you finding a developer for your project, we also offer our expertise and consultancy.',
        hiddenpara: 'Our team is well-versed in deployment strategies that prioritize security and efficiency.',
    },

]

const Work = () => {
    return (
        <div>
            <div className='mx-auto max-w-7xl mt-16 px-6 mb-20 relative'>
                <div className="radial-bgone hidden lg:block"></div>
                <div className='text-center mb-14'>
                    <h3 className='text-offwhite text-3xl md:text-5xl font-bold mb-3'>How it work</h3>
                    <p className='text-bluish md:text-lg font-normal leading-8'>We assists in secure project development and consults on existing projects, <br /> providing expertise for success in a dynamic landscape.</p>
                </div>

                <div className='grid md:grid-cols-2 lg:grid-cols-3 gap-y-20 gap-x-5 mt-32'>

                    {workdata.map((items, i) => (
                        <div className='card-b p-8' key={i}>
                            <div className='work-img-bg rounded-full flex justify-center absolute p-6'>
                                <Image src={items.imgSrc} alt={items.imgSrc} width={44} height={44} />
                            </div>
                            <div>
                                <Image src={'/images/Work/bg-arrow.svg'} alt="arrow-bg" width={85} height={35} />
                            </div>
                            <h3 className='text-2xl text-offwhite font-semibold text-center mt-8'>{items.heading}</h3>
                            <p className='text-base font-normal text-bluish text-center mt-2'>{items.subheading}</p>
                            <span className="text-base font-normal m-0 text-bluish text-center hides">{items.hiddenpara}</span>
                        </div>
                    ))}

                </div>

            </div>
        </div>
    )
}

export default Work;
