'use client'

import React, { useRef, useEffect, useState } from 'react';

import { Card } from './';

const Carousel = () => {
    const [pizzas, setPizzas] = useState<Product[]>([]);
    const containerRef = useRef<HTMLDivElement | null>(null);
    
    useEffect(() => {
        const fetchPizzas = async () => {
            const res = await fetch(`/api/products/category/pizzas`);
            const data = await res.json();

            setPizzas(data.products);
        }

        fetchPizzas();
    }, []);

    const handleScroll = (event: any) => {
        var containerWidth = containerRef.current?.clientWidth;
        var numberOfCards = 4;

        if (containerRef.current) {
            switch(true){
                case containerWidth! >= 1440:
                    numberOfCards = 4;
                    break;
                case containerWidth! >= 768:
                    numberOfCards = 3;
                    break;
                case containerWidth! >= 425:
                    numberOfCards = 2;
                    break;
                default:
                    numberOfCards = 1;
                    break;
            }

            if(event.deltaY > 0)
            containerRef.current.scrollLeft += containerWidth! / numberOfCards;
            else
            containerRef.current.scrollLeft += -(containerWidth! / numberOfCards);

        }
    };

    const handleMouseEnter = () => {
        if(pizzas.length <= 4) return;

        document.body.style.overflow = 'hidden';
    }

    const handleMouseLeave = () => {
        document.body.style.overflow = 'auto';
    }


    return (
        <section 
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
            ref={containerRef} 
            onWheel={handleScroll} 
            className='no-scrollbar flex flex-nowrap scroll-smooth h-content overflow-x-scroll w-full overflow-y-hidden'
        >
            {
                pizzas?.map((pizza) => {
                    return <Card key={pizza._id} product={pizza} category='pizzas' border={false} />
                })
            }
        </section>
    )

}

export default Carousel;