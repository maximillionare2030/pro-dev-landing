const About = () => {
  return (
    <section className="py-20 px-6 bg-white">
      <div className="max-w-4xl mx-auto fade-in">
        <h2 className="text-4xl md:text-5xl font-bold text-uci-navy mb-8 text-center">
          Our Mission
        </h2>
        <div className="prose prose-lg max-w-none">
          <p className="text-xl text-gray-700 mb-6 leading-relaxed">
            <strong>Developing Aspiring Young Professionals</strong> is a student-led organization at the University of California, Irvine dedicated to supporting students who need help affording professional development costs.
          </p>
          <p className="text-lg text-gray-600 mb-8 leading-relaxed">
            We believe that every student should have access to the resources they need to succeed in their professional journey, regardless of their financial situation.
          </p>

          <div className="bg-gray-50 rounded-lg p-8 mb-8">
            <h3 className="text-2xl font-semibold text-uci-navy mb-6">
              What We Support
            </h3>
            <ul className="space-y-4 text-gray-700">
              <li className="flex items-start">
                <span className="text-uci-gold mr-3 text-xl">•</span>
                <span className="text-lg">Professional clothing for interviews and networking events</span>
              </li>
              <li className="flex items-start">
                <span className="text-uci-gold mr-3 text-xl">•</span>
                <span className="text-lg">Professional headshots for LinkedIn and job applications</span>
              </li>
              <li className="flex items-start">
                <span className="text-uci-gold mr-3 text-xl">•</span>
                <span className="text-lg">Transportation to recruiting events, career fairs, and interviews</span>
              </li>
              <li className="flex items-start">
                <span className="text-uci-gold mr-3 text-xl">•</span>
                <span className="text-lg">Other early-career development needs and resources</span>
              </li>
            </ul>
          </div>

          <p className="text-lg text-gray-600 leading-relaxed">
            Your generous donation directly impacts students' ability to pursue their career goals and access opportunities that might otherwise be out of reach. Together, we can help build a more equitable future for all UCI students.
          </p>
        </div>
      </div>
    </section>
  )
}

export default About

