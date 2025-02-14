import Link from "next/link";
import Container from "../Container";
import FooterList from "./FooterList";
import { Redressed } from "next/font/google";
import { AiFillTwitterCircle,
    AiFillInstagram,
    AiFillLinkedin
 } from "react-icons/ai";


const redressed = Redressed({ subsets: ["latin"], weight: ["400"] });

const Footer = () => {
    return ( 
        <footer className= "bg-slate-700 text-slate-200 text-sm mt-16">
            <Container>
                <div className="flex flex-col md:flex-row justify-between pt-16 pb-8">
                    <FooterList>
                        <h3 className="text-base font-bold">Shop Categorie</h3>
                        <Link href="#">Phones</Link>
                        <Link href="#">Laptops</Link>
                        <Link href="#">Desktops</Link>
                        <Link href="#">Watches</Link>
                        <Link href="#">TVs</Link>
                        <Link href="#">Accessories</Link>
                    </FooterList>
                    <FooterList>
                        <h3 className="text-base font-bold">Customer Service</h3>
                        <Link href="#">Contact Us</Link>
                        <Link href="#">Shipping Policies</Link>
                        <Link href="#">Returns & Exchanges</Link>
                        <Link href="#">FAQs</Link>
                    </FooterList>
                    <div className="w-full md:w-1/3 mb-6 md:mb-0">
                        <h3 className="text-base font-bold">About Us</h3>
                        <p className="mb-2">
                            At sdley store, we offer the best quality products at the best prices. We are a one-stop shop for all your electronics needs.
                        </p>
                        <p className="italic">
                            &copy; February 2025 - {new Date().toLocaleString("en-US", { month: "long" })} {new Date().getFullYear()} &nbsp;
                            <Link href="/" className={`${redressed.className} font-bold text-xl`}>sdley e-Shop</Link><br /> 
                            All rights reserved.
                        </p>
                    </div>
                    <FooterList>
                        <h3 className="text-base font-bold">Follow Us</h3>
                        <div className="flex gap-2">
                            <Link href="https://www.linkedin.com/in/sdley/" target="_blank">
                                <AiFillLinkedin size={24} />
                            </Link>
                            <Link href="https://x.com/sdleye" target="_blank">
                                <AiFillTwitterCircle size={24} />
                            </Link>
                            <Link href="https://www.instagram.com/its_sdley/" target="_blank">
                                <AiFillInstagram size={24} />
                            </Link>
                        </div>
                    </FooterList>
                </div>
            </Container>
        </footer> );
}
 
export default Footer;