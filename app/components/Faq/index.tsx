"use client"
import Image from "next/image";
import { Disclosure } from '@headlessui/react';
import { ChevronUpIcon } from '@heroicons/react/20/solid';

interface faqdata {
    heading: string;
    subheading: string;
}

const faqdata: faqdata[] = [
    {
        heading: "1. What is WinDapp About?",
        subheading: 'Windapp is a platform that bridges the gap between developers with innovative ideas and those with the skills to bring these ideas to fruition.'
    },
    {
        heading: "2. Who can use the WinDapp?",
        subheading: 'Windapp is accessible to a wide range of users, including. Developers with creative ideas seeking collaboration, Skilled developers looking to join projects and bring ideas to life and Innovators and visionaries interested in connecting with capable developers '
    },
   
    {
        heading: "3. How useful is the $WBUK?",
        subheading: 'At the core of our mission lies the commitment to make $WBUK readily tradable and accessible to a broad audience. Our strategic approach involves a deliberate and systematic listing process, one exchange at a time'
    },
    {
        heading: "4. $WBUK be used in Windapp?",
        subheading: 'Indeed, the WinBulk token ($WBUK) serves as the primary currency within the Windapp ecosystem and the broader WinBulk community'
    },

]

const Faq = () => {
    return (
        <div className="my-20 px-6" id="faq-section">
            <h3 className="text-center text-3xl lg:text-5xl font-bold text-offwhite mb-3">Frequently Asked And Question</h3>
            <p className="text-center lg:text-lg font-normal text-bluish"> Our frequently asked questions section provides answers to common queries <br /> Please feel free to reach out to us if you cannot find an answer to your question.</p>

            <div className="mx-auto max-w-7xl">
                <div className="grid lg:grid-cols-2">
                    {/* Column-1 */}
                    <div>
                        <div className="w-full px-4 pt-16">

                            {faqdata.map((items, i) => (
                                <div className="mx-auto w-full max-w-5xl rounded-2xl bg-blue py-8 px-6 mb-5" key={i}>
                                    <Disclosure>
                                        {({ open }) => (
                                            <>
                                                <Disclosure.Button className="flex w-full justify-between rounded-lg text-offwhite sm:px-4 sm:py-2 text-left md:text-2xl font-medium">
                                                    <span>{items.heading}</span>
                                                    <ChevronUpIcon
                                                        className={`${open ? 'rotate-180 transform' : ''
                                                            } h-5 w-5 text-purple-500`}
                                                    />
                                                </Disclosure.Button>
                                                <Disclosure.Panel className="px-4 pt-4 pb-2 md:text-lg text-bluish font-normal opacity-50">{items.subheading}</Disclosure.Panel>
                                            </>
                                        )}
                                    </Disclosure>
                                </div>
                            ))}

                        </div>
                    </div>

                    {/* Column-2 */}
                    <div className="mt-32">
                        <Image src={'/images/Faq/faq.svg'} alt="faq-image" width={941} height={379} />
                    </div>

                </div>
            </div>

        </div>
    )
}

export default Faq;
