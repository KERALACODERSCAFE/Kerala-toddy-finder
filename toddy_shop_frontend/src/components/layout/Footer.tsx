import Link from "next/link";
import Image from "next/image";
import { getTranslations } from "next-intl/server";
import logo from "../../../public/logo.png";

export async function Footer() {
    const t = await getTranslations("Footer");
    const navLinks = [
        { name: t("links.home"), href: "/" },
        { name: t("links.explore"), href: "/explore" },
        { name: t("links.blog"), href: "/blog" },
        { name: t("links.community"), href: "/community" },
        { name: t("links.privacy"), href: "/privacy" },
        { name: t("links.terms"), href: "/terms" },
    ];

    return (
        <footer className="bg-[#006A4E] text-white w-full px-5 md:px-10 pt-5 pb-20 md:py-5 md:min-h-[200px] flex items-center justify-center ">
            <div className="max-w-[1440px] w-full mx-auto ">
                {/* Top section */}
                <div className="flex flex-col md:flex-row items-center  justify-between gap-5 md:gap-8">
                    {/* Logo */}
                    <div className="w-[50px] h-[70px] shrink-0">
                        <Image
                            src={logo}
                            alt={t("logoAlt")}
                            className="w-full h-full object-contain"
                            style={{ width: "auto", height: "auto" }}
                        />
                    </div>

                    {/* Navigation */}
                    <nav className="flex flex-col md:flex-row items-center justify-center md:justify-end gap-7 md:gap-4">
                        {navLinks.map((link) => (
                            <Link
                                key={link.name}
                                href={link.href}
                                className="font-[family-name:var(--font-body)] font-normal text-[20px] md:text-[14px] lg:text-[16px] xl:text-[20px] leading-[100%] tracking-[0%] text-[#F5F5F5]"
                            >
                                {link.name}
                            </Link>
                        ))}
                    </nav>
                </div>

                <div className="mt-5 md:mt-8 flex flex-col md:flex-row items-center justify-between gap-5 md:gap-4 text-center md:text-left">
                    <p className="font-[family-name:var(--font-body)] font-normal text-[18px] md:text-[14px] lg:text-[16px] xl:text-[20px] leading-[130%] tracking-[0%] text-[#F5F5F5]">
                        {t("copyright")}
                    </p>

                    <p className="max-w-[430px] md:max-w-[800px] font-[family-name:var(--font-body)] font-normal text-[18px] md:text-[14px] lg:text-[16px] xl:text-[20px] leading-[130%] tracking-[0%] text-[#F5F5F5] md:text-right">
                        {t("warning")}
                    </p>
                </div>
            </div>
        </footer>
    );
}
