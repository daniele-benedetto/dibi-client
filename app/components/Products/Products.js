"use client";
import Card from "@/app/components/Card/Card";
export default function Products({products}) {
    return (
        <section className='flex flex-wrap w-full md:w-2/3'>
            {products.map((product, idx) => {
                return (
                    <Card key={idx} product={product.attributes} />
                );
            })}
        </section>
    );
}
