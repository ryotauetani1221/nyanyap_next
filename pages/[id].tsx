import type { NextPage } from 'next'
import Head from 'next/head'
// import { useRouter } from 'next/router'
import React, { useRef } from 'react';
import dynamic from 'next/dynamic';
const Canvas = dynamic(() => import('../components/canvas'), { ssr: false })


const Home: NextPage = ({ data }) => {
    const ngx_url = process.env.NEXT_PUBLIC_NGX_URL
    const mangaElement = useRef();

    return (
        <div className='container'>
            <Head>
                <title>マンガだよ</title>
                <meta name="description" content="Generated by create next app" />
                <link rel="icon" href="/favicon.ico" />
            </Head>
            <div className="">
                <p className="">
                    <b>id:</b>{data.id}
                </p>

                <h3 className='mb-1'>タイトル</h3>
                <h1 className="mt-0 mb-6">
                    {data.title}
                </h1>
            </div>
            <Canvas src={data.manga} />

            <div className='display-none mt-0 mt-3 p-2'></div>
            <h2 className='mb-3 font-bold'>↓元画像</h2>

            <div ref={mangaElement} className={'grid grid-cols-' + chunk(data.manga, 4).length} >
                {chunk(data.manga, 4).map((item, index) => {
                    return (
                        <div key={index} style={{ width: '428px' }} className={'self-start mangaBlock' + (index + 1)}>
                            {
                                item.map((manga, index) => {
                                    return (
                                        <div key={index} className={'hover:opacity-50 border-4 border-zinc-900 ' + ((index / 4 === 0) ? 'mt-0' : '')} style={{ marginTop: ((index / 4 === 0) ? '' : '24px;') }} >
                                            <img key={index} src={ngx_url + (new URL(manga.koma.url).pathname) + '?fm=webp&prox=' + (new URL(manga.koma.url).host)} className='' alt="" />
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



import { client } from "../libs/client";

// ビルド時にも呼び出されます。
export async function getServerSideProps(context) {
    try {
        const data = await client.get({
            endpoint: '4koma',
            contentId: context.query.id,
        });
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
