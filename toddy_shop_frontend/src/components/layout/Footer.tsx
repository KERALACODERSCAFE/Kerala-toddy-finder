import Link from "next/link";
import Image from "next/image";
import logo from "../../../public/logo.png";
export function Footer() {
    return (
        <footer className="bg-[#006A4E] text-white min-h-[200px] w-full px-5 md:px-10 py-5 flex items-center">
            {" "}
            <div className="max-w-[1440px] w-full mx-auto">
                {" "}
                <div className="flex items-center justify-between">
                    {" "}
                    {/* logo */}{" "}
                    <div className="w-[50px] h-[70px]">
                        {" "}
                        <Image
                            src={logo}
                            alt="Kerala Coder Cafe Logo"
                            className="w-full h-full object-contain"
                        />{" "}
                    </div>{" "}
                    {/* navigation */}{" "}
                    <nav className="flex items-center gap-4">
                        {" "}
                        <Link
                            href="/"
                            className="font-[family-name:var(--font-body)] font-normal text-[20px] leading-[100%] tracking-[0%] text-[#F5F5F5]"
                        >
                            {" "}
                            Home{" "}
                        </Link>{" "}
                        <Link
                            href="/explore"
                            className="font-[family-name:var(--font-body)] font-normal text-[20px] leading-[100%] tracking-[0%] text-[#F5F5F5]"
                        >
                            {" "}
                            Explore{" "}
                        </Link>{" "}
                        <Link
                            href="/blog"
                            className="font-[family-name:var(--font-body)] font-normal text-[20px] leading-[100%] tracking-[0%] text-[#F5F5F5]"
                        >
                            {" "}
                            Blog{" "}
                        </Link>{" "}
                        <Link
                            href="/community"
                            className="font-[family-name:var(--font-body)] font-normal text-[20px] leading-[100%] tracking-[0%] text-[#F5F5F5]"
                        >
                            {" "}
                            Community{" "}
                        </Link>{" "}
                        <Link
                            href="/privacy"
                            className="font-[family-name:var(--font-body)] font-normal text-[20px] leading-[100%] tracking-[0%] text-[#F5F5F5]"
                        >
                            {" "}
                            Privacy{" "}
                        </Link>{" "}
                        <Link
                            href="/terms"
                            className="font-[family-name:var(--font-body)] font-normal text-[20px] leading-[100%] tracking-[0%] text-[#F5F5F5]"
                        >
                            {" "}
                            TnC{" "}
                        </Link>{" "}
                    </nav>{" "}
                </div>{" "}
                {/* Bottom section */}{" "}
                <div className="mt-8 flex items-center justify-between gap-6">
                    {" "}
                    <p className="whitespace-nowrap font-[family-name:var(--font-body)] font-normal text-[20px] leading-[100%] tracking-[0%] text-[#F5F5F5]">
                        {" "}
                        © 2026, Kerala Coder Cafe{" "}
                    </p>{" "}
                    <p className="font-[family-name:var(--font-body)] font-normal text-[20px] leading-[100%] tracking-[0%] text-[#F5F5F5] text-right">
                        {" "}
                        Consumption of alcohol is injurious to health and “Be
                        safe: Don’t drink and drive”{" "}
                    </p>{" "}
                </div>{" "}
            </div>{" "}
        </footer>
    );
}
