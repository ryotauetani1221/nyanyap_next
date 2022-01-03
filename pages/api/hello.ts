// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'

// type Data = {
//   name: string
// }

// export default function handler(
//   req: NextApiRequest,
//   res: NextApiResponse<Data>
// ) {
//   res.status(200).json({ name: 'John Doe' })
// }

// import puppeteer from 'puppeteer'

// async function printPdf(req, res) {
//   const browser = await puppeteer.launch()
//   const page = await browser.newPage()
//   await page.goto(`https://www.yahoo.co.jp`, {
//     waitUntil: 'networkidle2',
//   })
//   const pdf = await page.pdf({
//     path: 'test.pdf',
//     printBackground: true,
//     format: 'a4',
//   })
//   await browser.close()

//   return pdf
// }

// async function generatePdf(req, res) {
//   const pdf = await printPdf(req, res)

//   res.send(pdf)
// }

// export default generatePdf


// // const puppeteer = require('puppeteer');
// // (async () => {
// //   const browser = await puppeteer.launch({ headless: true });
// //   const page = await browser.newPage();
// //   await page.goto('https://www.yahoo.co.jp');
// //   await page.screenshot({ path: 'screenshot.png' });

// //   await browser.close();

// // })();