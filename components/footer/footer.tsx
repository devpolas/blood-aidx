import Link from "next/link";
import { ArrowUpRight, HeartHandshake, MapPin } from "lucide-react";
import { FaFacebookF, FaGithub, FaInstagram } from "react-icons/fa";
import Logo from "../logo/logo";

const footerLinks = {
  explore: [
    { label: "Find Blood Donors", href: "/find-donors" },
    { label: "Blood Requests", href: "/find-requests" },
    { label: "Organizations", href: "/find-organizations" },
  ],
  account: [
    { label: "Become a Donor", href: "/signup" },
    { label: "Create an Account", href: "/signup" },
    { label: "Sign In", href: "/signin" },
  ],
};

const socialLinks = [
  {
    label: "Facebook",
    href: "https://www.facebook.com/",
    icon: FaFacebookF,
  },
  {
    label: "Instagram",
    href: "https://www.instagram.com/",
    icon: FaInstagram,
  },
  {
    label: "GitHub",
    href: "https://github.com/",
    icon: FaGithub,
  },
];

export function Footer() {
  const year = 2026;

  return (
    <footer className='bg-muted/30 mx-auto border-t max-w-11/12'>
      <div className='mx-auto px-4 sm:px-6 lg:px-8'>
        <div className='gap-10 lg:gap-12 grid lg:grid-cols-[1.4fr_1fr_1fr_1fr] py-12 sm:py-14'>
          {/* Brand */}
          <div className='max-w-sm'>
            <Logo />

            <p className='mt-5 text-muted-foreground text-sm leading-7'>
              Connecting blood donors, people in need, volunteers, and
              healthcare organizations to make blood donation more accessible.
            </p>

            <div className='inline-flex items-center gap-2 bg-background mt-5 px-3 py-2 border rounded-full font-medium text-muted-foreground text-xs'>
              <HeartHandshake className='size-4 text-primary' />
              Together, we can make a difference.
            </div>

            <div className='flex items-center gap-2 mt-6'>
              {socialLinks.map(({ label, href, icon: Icon }) => (
                <a
                  key={label}
                  href={href}
                  target='_blank'
                  rel='noopener noreferrer'
                  aria-label={label}
                  className='flex justify-center items-center bg-background hover:bg-primary/5 border hover:border-primary/30 rounded-lg size-9 text-muted-foreground hover:text-primary transition-colors'
                >
                  <Icon className='size-4' />
                </a>
              ))}
            </div>
          </div>

          {/* Explore */}
          <div>
            <h2 className='font-semibold text-sm'>Explore</h2>

            <ul className='space-y-3 mt-5'>
              {footerLinks.explore.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className='text-muted-foreground hover:text-primary text-sm transition-colors'
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Account */}
          <div>
            <h2 className='font-semibold text-sm'>Get Started</h2>

            <ul className='space-y-3 mt-5'>
              {footerLinks.account.map((link, index) => (
                <li key={`${link.label}-${index}`}>
                  <Link
                    href={link.href}
                    className='text-muted-foreground hover:text-primary text-sm transition-colors'
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Mission */}
          <div>
            <h2 className='font-semibold text-sm'>Our Mission</h2>

            <p className='mt-5 text-muted-foreground text-sm leading-7'>
              We believe finding blood and connecting with donors should be
              easier for everyone.
            </p>

            <Link
              href='/find-requests'
              className='inline-flex items-center gap-2 hover:gap-3 mt-4 font-semibold text-primary text-sm transition-all'
            >
              Help someone today
              <ArrowUpRight className='size-4' />
            </Link>

            <div className='flex items-start gap-2 mt-5 text-muted-foreground text-sm'>
              <MapPin className='mt-0.5 size-4 text-primary shrink-0' />
              <span>Connecting communities through blood donation</span>
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div className='flex sm:flex-row flex-col sm:justify-between sm:items-center gap-3 py-5 border-t text-muted-foreground text-sm'>
          <p>© {year} Blood AidX. All rights reserved.</p>

          <p className='flex items-center gap-1.5'>
            Built with care for the community
            <HeartHandshake className='size-4 text-primary' />
          </p>

          <Link
            href='/'
            className='inline-flex items-center gap-1 font-medium hover:text-primary transition-colors'
          >
            Back to home
            <ArrowUpRight className='size-3.5' />
          </Link>
        </div>
      </div>
    </footer>
  );
}
