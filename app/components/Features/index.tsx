import Image from "next/image";

interface featuresdata {
    imgSrc: string;
    heading: string;
    subheading: string;
    launchUrl: string;
}

const featuresdata: featuresdata[] = [
    {
        imgSrc: '/images/Features/featureOne.svg',
        heading: 'Winplay',
        subheading: 'A kind of lottery gaming experience',
        launchUrl: '/winplay',
    },
    {
        imgSrc: '/images/Features/featureTwo.svg',
        heading: 'Staking',
        subheading: 'Allows you to maximize your $WBUK holdings',
        launchUrl: '/staking',
    },
    {
        imgSrc: '/images/Features/featureThree.svg',
        heading: 'WinDapp',
        subheading: 'Connects clients and blockchain developers',
        launchUrl: '/windapp',
    },
];

const Features = () => {
    return (
        <div className="mx-auto max-w-7xl my-0 md:my-40 pt-36 px-6 relative" id="features-section">
            <div className="radial-bg hidden lg:block"></div>
            <div className="grid lg:grid-cols-2 gap-x-4 gap-y-4">
                {/* Column-1 */}
                <div>
                    <h3 className="feature-font text-lg font-semibold mb-4 text-center md:text-start">Ecosystem</h3>
                    <h2 className="text-offwhite text-3xl lg:text-5xl font-semibold leading-snug mb-6 text-center md:text-start">Our Own Utilities</h2>
                    <p className="lg:text-lg font-normal text-bluish text-center md:text-start">Our utilities enhance your blockchain experience. Winplay offers an immersive lottery kind of gaming experience, while our staking services allow you to maximize your $WBUK holdings. Windapp is a dapp that will connect clients and dapp developers</p>
                </div>
                {/* Column-2 */}
                <div>
                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-x-4 gap-y-4 lg:-mr-56">
                        {featuresdata.map((items, i) => (
                            <div className="bg-blue py-10 pr-12 pl-6 rounded-lg relative" key={i}>
                                <div className="rounded-full gg h-16 w-16 flex items-center justify-center mb-6">
                                    <Image src={items.imgSrc} alt={items.imgSrc} width={24} height={30} />
                                </div>
                                <h5 className="text-offwhite text-lg font-medium mb-3">{items.heading}</h5>
                                <p className="text-lightblue text-sm font-normal mb-3">{items.subheading}</p>
                                <a href={items.launchUrl} className=" text-l font-semibold text-white py-2 px-2 lg:px-6 navbutton mr-3">Launch Dapp</a>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Features;
