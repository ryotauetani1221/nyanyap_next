import type { NextPage, GetStaticProps } from 'next'
import Head from 'next/head'
// import Image from 'next/image'
// import styles from '../styles/Home.module.css'
import Script from 'next/script'
// import { useRouter } from 'next/router'
import React, { useRef } from 'react';

const Home: NextPage = ({ data }) => {
    const ngx_url = process.env.NEXT_PUBLIC_NGX_URL

    const mangaElement = useRef();
    async function MakeImage() {



        // let imgDoms = mangaElement.current.querySelectorAll('img');
        // imgDoms.forEach(async (imgDom) => {
        //     imgDom.src = await getImageBase64(imgDom.src);
        //     console.log(imgDom.src);
        // });

        const mangaBlock = mangaElement.current.querySelectorAll('.mangaBlock');

        // mangaBlock.forEach(async (element) => {
        //     let makeCanvas = await html2canvas(element, { allowTaint: true });
        //     element.style.display = 'none';
        //     makeCanvas.className = 'float-left';
        //     document.body.appendChild(makeCanvas);
        // });

        var length = mangaBlock.length;
        for (let i = 0; i < length; i++) {
            let makeCanvas = await html2canvas(mangaBlock[i], { allowTaint: true });
            mangaBlock[i].style.display = 'none';
            // makeCanvas.className = 'float-left display-block hover:opacity-50 p-2';
            makeCanvas.className = 'float-left p-2';
            document.body.appendChild(makeCanvas);
        }
        document.querySelector('html').className = 'bg-gray-200'


        // html2canvas(mangaElement.current, { allowTaint: true }).then(canvas => {
        //     mangaElement.current.style.display = 'none';
        //     // canvas.title = 'manga';
        //     document.body.appendChild(canvas);
        //     console.log(canvas);

        //     // window.location = canvas;
        //     // const a = document.createElement("a");
        //     // console.log(canvas);
        //     // a.href = canvas.toDataURL();
        //     // a.download = "sampleData.jpg"; //フォーマットによってファイル拡張子を変えている
        //     // a.click();
        //     // a.remove();
        // });
    }
    return (
        <div className='container'>
            <Head>
                <title>Create Next App</title>
                <meta name="description" content="Generated by create next app" />
                <link rel="icon" href="/favicon.ico" />
            </Head>
            <Script src="https://html2canvas.hertzen.com/dist/html2canvas.js" />
            {/* <p>aaa</p> */}
            <button onClick={MakeImage}>
                画像を作る
            </button >
            <div className="">
                <p className="">
                    <b>id:</b>{data.id}
                </p>

                <h3 className='mb-1'>タイトル</h3>
                <h1 className="mt-0 mb-6">
                    {data.title}
                </h1>
                <div className='display-none mt-0 mt-3 p-2'></div>
            </div>
            <div ref={mangaElement} className={'grid grid-cols-' + chunk(data.manga, 4).length} >
                {chunk(data.manga, 4).map((item, index) => {
                    return (
                        <div key={index} style={{ width: '428px' }} className='mangaBlock'>
                            {
                                item.map((manga, index) => {
                                    return (
                                        <div key={index} className={'hover:opacity-50 border-4 border-zinc-900 mt-' + ((index / 4 === 0) ? '0' : '3')} >
                                            <img key={index} src={ngx_url + (new URL(manga.koma.url).pathname) + '?fm=webp&w=960&prox=' + (new URL(manga.koma.url).host)} className='' alt="" />
                                        </div>
                                    )
                                })
                            }
                        </div>
                    )

                })}
                {/* {data.manga.map((manga, index) => {
                    return (
                        <div key={index} className='border-4 border-zinc-900 mt-6' >
                            <img key={index} src={ngx_url + (new URL(manga.koma.url).pathname) + '?fm=webp&w=960&prox=' + (new URL(manga.koma.url).host)} className='' alt="" />
                        </div>
                    )
                })} */}

                {/* {data.manga.map((manga, index) => (
                    <div key={index} className='border-4 border-zinc-900 mt-6' >
                        <img key={index} src={ngx_url + (new URL(manga.koma.url).pathname) + '?fm=webp&w=960&prox=' + (new URL(manga.koma.url).host)} className='' alt="" />
                    </div>
                ))} */}
            </div>
        </div >
    )
}

export default Home

// export async function getStaticPaths() {
//     return {
//         paths: [
//             // { params: { id: '44wpcz353' } }
//         ],
//         fallback: true
//         // fallback: false
//     };
// }

import { client } from "../libs/client";

// ビルド時にも呼び出されます。
// export async function getStaticProps({ params }) {
export async function getServerSideProps(context) {
    // const { id } = context.query;
    // console.log(context.query.id);

    try {
        const data = await client.get({
            endpoint: '4koma',
            contentId: context.query.id,
            // contentId: '6p0kyi5iyy16',
        });

        // 記事データをprops経由でページに渡します。
        return {
            props: {
                data,
            },
        };
    } catch (e) {
        return { notFound: true };
    }
}

function chunk<T extends any[]>(arr: T, size: number) {
    return arr.reduce(
        (newarr, _, i) => (i % size ? newarr : [...newarr, arr.slice(i, i + size)]),
        [] as T[][]
    )
}
