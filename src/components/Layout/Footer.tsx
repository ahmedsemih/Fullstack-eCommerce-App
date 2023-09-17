import Link from "next/link";
import { footerLinks, phoneNumbers } from "@/utils/constants";

const Footer = () => {
  return (
    <footer className="w-full bg-white text-black border-t-2 border-bla">
      <div className="flex md:flex-row flex-col text-center md:text-start justify-between gap-2 py-8 px-4 md:px-7 lg:px-16 xl:px-[128px]">
          <div className="md:mt-0 mt-4">
            <h6 className="font-bold text-2xl mb-5">Help</h6>
            {
              footerLinks.help.map((link) => (
                <p key={link} className="text-xl mb-4 font-semibold hover:underline">{link}</p>
              ))
            }
          </div>
          <div className="md:mt-0 mt-4">
            <h6 className="font-bold text-2xl mb-5">Products</h6>
            {
              footerLinks.products.map((product) => (
                <Link className="block text-xl mb-4 font-semibold hover:underline" href={product.link}>{product.name}</Link>
              ))
            }
          </div>
          <div className="md:mt-0 mt-4">
            <div className="mb-3">
              <h6 className="font-bold text-2xl mb-1">Order Line</h6>
              <p className="text-5xl text-mainGreen font-bold">{phoneNumbers.order}</p>
            </div>
            <div>
              <h6 className="font-bold text-2xl mb-1">Question & Advice Line</h6>
              <p className="text-5xl text-mainRed mb-3 font-bold">{phoneNumbers.questionAndAdvice}</p>
              <p className="text-xl font-bold">info@pizzahaven.com</p>
            </div>
          </div>
      </div>
      <div className="bg-mainGreen text-white w-full flex flex-col sm:flex-row px-4 md:px-7 lg:px-16 xl:px-[128px] text-sm md:text-lg lg:text-2xl py-4 justify-between">
        <p>© Pizza Haven {new Date().getFullYear()}. All right reserved.</p>
        <p>Created by <Link className="font-semibold" href='https://github.com/ahmedsemih' rel="noreferrer" target="_blank">Ahmed Semih Erkan</Link></p>
      </div>
    </footer>
  )
}

export default Footer;