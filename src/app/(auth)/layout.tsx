import React from 'react';
import Image from 'next/image';


const layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
        <section>
            <div>
                <Image 
                    src='/next.svg'
                    alt='logo'
                    width={224}
                    height={82}
                />
                <div>
                    <h1 className="h1">Manage your data room in an intuitive way</h1>
                    <p>
                        Virtual Data Room for your specific situation. This content should be on the left side of the screen. Need to search the CSS of the tutorial for the relevant className.
                    </p>
                </div>
            </div>
        </section>
        <section>
        {/* <section className="flex flex-1 flex-col items-center bg-white p-4 py-10 lg:justify-center lg:p-10 lg:py-0"> */}
            
            {children}
            
        </section>
        
    </div>
  )
}

export default layout