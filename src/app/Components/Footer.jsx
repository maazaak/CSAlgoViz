import React from "react";
import Link from "next/link";

const FooterLink = ({ href, children }) => (
  <Link
    href={href}
    className="flex justify-center items-center  text-gray-200 text-xs text-m hover:text-white transition-colors duration-300 mb-2"
  >
    {children}
  </Link>
);

const FooterSection = ({ title, children }) => (
  <div>
    <h5 className="text-white text-sm mb-2 flex justify-center items-center">
      {title}
    </h5>
    {children}
  </div>
);

const Footer = () => {
  return (
    <div className="mt-10">
      <div className="bg-[#f0916c] text-[#f7f8d7] font-semibold text-lg flex justify-center items-center">
        <div className="grid grid-cols-4 gap-4 m-8">
          <div>
            <div className="flex justify-center items-center mb-12">
              <h5>
                Our mission is to provide a free, world-class education to
                anyone, anywhere.
              </h5>
            </div>
            <p className="text-xs mb-2">Language English</p>
            <p className="text-xs">Country Pakistan</p>
          </div>
          <FooterSection title="About">
            <FooterLink href="#">Our Team</FooterLink>
          </FooterSection>

          <FooterSection title="Contact">
            <FooterLink href="#">Help center</FooterLink>
            <FooterLink href="#">Support community</FooterLink>
          </FooterSection>

          <FooterSection title="Courses">
            <FooterLink href="#">Data Structures</FooterLink>
            <FooterLink href="#">Software Engineering</FooterLink>
            <FooterLink href="#">Database Systems</FooterLink>
            <FooterLink href="#">Computer Architecture</FooterLink>
            <FooterLink href="#">Operating Systems</FooterLink>
            <FooterLink href="#">Artificial Intelligence</FooterLink>
            <FooterLink href="#">Theory of Automata</FooterLink>
          </FooterSection>
        </div>
      </div>
      <div className="bg-[#f0916c] text-[#f7f8d7] font-semibold text-lg flex justify-center items-center pb-5">
        <p>© 2023 CSAlgoViz</p>
      </div>
    </div>
  );
};

export default Footer;
