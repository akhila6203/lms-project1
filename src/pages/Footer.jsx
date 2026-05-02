import { Link } from "react-router-dom";
import { Github, Twitter, Linkedin, Mail } from "lucide-react";

export default function Footer() {
  return (
    <footer id="footer" className="mt-20 border-t border-border bg-white">
      {/* bg-secondary/40 */}
      {/* TOP */}
      <div className="mx-auto grid max-w-7xl grid-cols-2 gap-8 px-4 py-12 sm:px-6 md:grid-cols-4 lg:px-8">
        
        {/* LOGO + DESC */}
        <div className="col-span-2 md:col-span-1">
          <Link to="/" className="flex items-center gap-2">
            <div
              className="flex h-9 w-9 items-center justify-center rounded-lg shadow-md "
              style={{ background: "var(--gradient-primary)" }}
            >
              <span className="text-primary-foreground text-sm font-bold text-purple-700">
                L
              </span>
            </div>
            <span className="text-base font-semibold">LMS</span>
          </Link>

          <p className="mt-3 text-sm text-muted-foreground">
            Learning today, leading tomorrow. Modern courses for builders,
            designers, and engineers.
          </p>

          <div className="mt-4 flex items-center gap-3 text-muted-foreground">
            <a href="#" className="hover:text-foreground">
              <Github className="h-4 w-4" />
            </a>
            <a href="#" className="hover:text-foreground">
              <Twitter className="h-4 w-4" />
            </a>
            <a href="#" className="hover:text-foreground">
              <Linkedin className="h-4 w-4" />
            </a>
            <a href="#" className="hover:text-foreground">
              <Mail className="h-4 w-4" />
            </a>
          </div>
        </div>

        {/* LEARN */}
        <div>
          <h4 className="text-sm font-semibold">Learn</h4>
          <ul className="mt-3 space-y-2 text-sm text-muted-foreground">
            <li>
              <Link to="/homecourses" className="hover:text-foreground hover:underline">
                Browse courses
              </Link>
            </li>
            
            <li>
              <a href="#paths" className="hover:text-foreground hover:underline">
                Learning paths
              </a>
            </li>

            <li>
              <a href="#teams" className="hover:text-foreground hover:underline">
                For teams
              </a>
            </li>

            <li>
              <a href="#pricing" className="hover:text-foreground hover:underline">
                Pricing
              </a>
            </li>
          </ul>
        </div>

        {/* COMPANY */}
        <div>
          <h4 className="text-sm font-semibold">Company</h4>
          <ul className="mt-3 space-y-2 text-sm text-muted-foreground">
            <Link to="/about" className="hover:text-foreground hover:underline">
              About
            </Link>
            <li><a href="#" className="hover:text-foreground hover:underline">Careers</a></li>
            <li><a href="#" className="hover:text-foreground hover:underline">Blog</a></li>
            <li><a href="#" className="hover:text-foreground hover:underline">Contact</a></li>
          </ul>
        </div>

        {/* LEGAL */}
        <div>
          <h4 className="text-sm font-semibold">Legal</h4>
          <ul className="mt-3 space-y-2 text-sm text-muted-foreground">
            <li><a href="#" className="hover:text-foreground hover:underline">Terms</a></li>
            <li><a href="#" className="hover:text-foreground hover:underline">Privacy</a></li>
            <li><a href="#" className="hover:text-foreground hover:underline">Cookies</a></li>
            <li><a href="#" className="hover:text-foreground hover:underline">DPA</a></li>
          </ul>
        </div>

      </div>

      {/* BOTTOM */}
      <div className="border-t border-border bg-white">
        <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-2 px-4 py-5 text-xs text-muted-foreground sm:flex-row sm:px-6 lg:px-8">
          
          <p>
            © {new Date().getFullYear()} LMS. All rights reserved.
          </p>

          <p>
            Built with care for learners worldwide.
          </p>

        </div>
      </div>

    </footer>
  );
}