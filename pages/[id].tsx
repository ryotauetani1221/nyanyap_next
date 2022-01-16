import type { NextPage } from 'next'
import Head from 'next/head'
// import { useRouter } from 'next/router'
import React, { useRef } from 'react';
import dynamic from 'next/dynamic';
const Canvas = dynamic(() => import('../components/canvas'), { ssr: false })
import { toPng } from 'html-to-image';
import ReactLoading from 'react-loading';
import ReactDOM from 'react-dom';

const Home: NextPage = ({ data }) => {
    const ngx_url = process.env.NEXT_PUBLIC_NGX_URL
    const mangaElement = useRef();
    const mangaElementInsta = useRef();

    async function MakeImage() {
        const mangaElementDom = mangaElement.current.querySelectorAll('.mangaBlock')
        // mangaElement.current.render(<div className='text-center'><ReactLoading type="spin" /></div>, mangaElement.current)
        // ReactDOM.render(<div className='text-center'><ReactLoading type="spin" /></div>, mangaElement.current)
        mangaElementDom.forEach(async (element, index) => {

            const png = await toPng(element, { cacheBust: true, })
            const link = document.createElement('a')
            link.download = data.title + ('00' + (index + 1)).slice(-2)
            link.href = png
            link.click()

        });
        // ReactDOM.render(<p>完了!!</p>, mangaElement.current)


    }

    async function MakeImageInsta() {
        const mangaElementDom = mangaElementInsta.current.querySelectorAll('.mangaBlock')
        mangaElementDom.forEach(async (element, index) => {

            const png = await toPng(element, { cacheBust: true, })
            const link = document.createElement('a')
            link.download = data.title + '_insta' + ('00' + (index + 1)).slice(-2)
            link.href = png
            link.click()

        });
    }

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

            <button onClick={MakeImage}>
                livedoor画像をまとめて作る
            </button >
            <div className='display-none mt-0 mt-3 p-2'></div>
            <h2 className='mb-3 font-bold'>↓元画像</h2>

            {/* <div ref={mangaElement} className={'grid grid-cols-' + chunk(data.manga, 2).length} > */}
            <div ref={mangaElement} className={'grid grid-cols-3 gap-3'} >
                {chunk(data.manga, 2).map((item, index) => {
                    return (
                        <div key={index} style={{ width: '428px' }} className={'self-start mangaBlock mangaBlock' + (index + 1)}>
                            {
                                item.map((manga, index) => {
                                    return (
                                        <div key={index} className={'hover:opacity-50 border-4 border-zinc-900 ' + ((index / 2 === 0) ? 'mt-0' : '')} style={{ marginTop: ((index / 4 === 0) ? '' : '24px;') }} >
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

            <div className="my-6">
                <button onClick={MakeImageInsta} className='my-3'>
                    insta画像をまとめて作る
                </button >
                <div ref={mangaElementInsta} className={''} >
                    {chunk(data.manga, 1).map((item, index) => {
                        return (
                            <div key={index} style={{ width: '1080px' }} className={'self-start mangaBlock mangaBlock' + (index + 1)}>
                                {
                                    item.map((manga, index) => {
                                        return (
                                            <div key={index} className={'hover:opacity-50  bg-white flex items-center ' + ((index / 2 === 0) ? 'mt-0' : '')} style={{ height: '1080px', marginTop: ((index / 4 === 0) ? '' : '24px;') }} >
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
