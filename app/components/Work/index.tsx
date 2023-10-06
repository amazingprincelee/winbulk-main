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
        subheading: 'Click the Get started button to journey of actualizing your ideas. Your decision to take action by clicking the Get Started button has set the wheels in motion.',
        hiddenpara: 'this is a step you take to begin your journet, or a step you take to give more value to your existing technology. it is a decisive step to obtain success',
    },
    {
        imgSrc: '/images/Work/submit1.png',
        heading: 'Submit your Idea',
        subheading: 'Complete the form to submit your idea to the Winbulk team. Our team will thoroughly evaluate your concept and develop a strategic plan to bring it to fruition',
        hiddenpara: 'our experts will carefully review it and craft a strategic plan to transform your ideas into a successful venture. We also rebrand and upgrade existing projects.',
    },
    {
        imgSrc: '/images/Work/launch.png',
        heading: 'Production',
        subheading: 'We are not only dedicated to helping you develop your project securely, but we also offer our expertise as consultants for existing projects.',
        hiddenpara: 'Our team is well-versed in deployment strategies that prioritize security and efficiency, ensuring a smooth transition from concept to reality.',
    },

]

const Work = () => {
    return (
        <div>
            <div className='mx-auto max-w-7xl mt-16 px-6 mb-20 relative'>
                <div className="radial-bgone hidden lg:block"></div>
                <div className='text-center mb-14'>
                    <h3 className='text-offwhite text-3xl md:text-5xl font-bold mb-3'>How it work</h3>
                    <p className='text-bluish md:text-lg font-normal leading-8'>Winbulk assists in secure project development and consults on existing projects, <br /> providing expertise for success in a dynamic landscape.</p>
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
