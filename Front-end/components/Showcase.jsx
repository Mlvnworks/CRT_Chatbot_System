import Image from 'next/image';
import Link from 'next/link';
import React from 'react';
import style from '@/styles/showcase.module.css';

const Showcase = () => {
    return (
        <section className={style.showcase}>
            <section>
                <header>
                    <Image src={'/img/CRT2 1.png'} alt='CRT logo' height={100} width={100} />
                    <h1>CRT ChatBot</h1>
                </header>
                <section>
                    <div className={style.bot_svg_container}></div>
                    <p>
                        This system's responses are composed by an AI and are based on school-provided data. Please use these responses with discretion and independently verify information when
                        needed.
                    </p>
                </section>
                <footer>
                    <Link href={''}>
                        <div className={style.developer_icon_container}></div>
                        Developers
                    </Link>
                </footer>
            </section>
        </section>
    );
};

export default Showcase;
