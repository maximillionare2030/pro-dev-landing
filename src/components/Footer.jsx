const Footer = () => {
  return (
    <footer className="bg-gray-900 text-white py-12 px-6">
      <div className="max-w-6xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
          <div>
            <h3 className="text-xl font-bold mb-4 text-uci-gold">
              Developing Aspiring Young Professionals
            </h3>
            <p className="text-gray-400">
              Supporting UCI students in their professional development journey.
            </p>
          </div>

          <div>
            <h4 className="text-lg font-semibold mb-4">Contact Us</h4>
            <p className="text-gray-400 mb-2">
              <a
                href="mailto:contact@aypuci.org"
                className="hover:text-uci-gold transition-colors"
              >
                maximitt@uci.edu
              </a>
            </p>
          </div>

          <div>
            <h4 className="text-lg font-semibold mb-4">Location</h4>
            <p className="text-gray-400">
              University of California, Irvine<br />
              Irvine, CA 92697
            </p>
          </div>
        </div>

        <div className="border-t border-gray-800 pt-8 text-center text-gray-400 text-sm">
          <p>
            © {new Date().getFullYear()} Developing Aspiring Young Professionals. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  )
}

export default Footer

