const Impact = () => {
  return (
    <section className="py-20 px-6 bg-gradient-to-b from-white to-gray-50">
      <div className="max-w-6xl mx-auto">
        <h2 className="text-4xl md:text-5xl font-bold text-uci-navy mb-12 text-center fade-in">
          Our Impact
        </h2>

        {/* Impact Metrics */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
          <div className="bg-white rounded-lg p-8 shadow-md text-center fade-in">
            <div className="text-4xl font-bold text-uci-gold mb-2">50+</div>
            <div className="text-gray-600 text-lg">Students Supported</div>
          </div>
          <div className="bg-white rounded-lg p-8 shadow-md text-center fade-in">
            <div className="text-4xl font-bold text-uci-gold mb-2">$1.2K / $10K+</div>
            <div className="text-gray-600 text-lg">Funds Raised</div>
          </div>
          <div className="bg-white rounded-lg p-8 shadow-md text-center fade-in">
            <div className="text-4xl font-bold text-uci-gold mb-2">100%</div>
            <div className="text-gray-600 text-lg">Direct to Students</div>
          </div>
        </div>

        {/* Testimonials */}
        <div className="space-y-8">
          <h3 className="text-3xl font-semibold text-uci-navy mb-8 text-center">
            Student Testimonials
          </h3>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="bg-white rounded-lg p-8 shadow-md fade-in">
              <div className="flex items-center mb-4">
                <div className="w-12 h-12 bg-uci-gold rounded-full flex items-center justify-center text-uci-navy font-bold text-lg mr-4">
                  JD
                </div>
                <div>
                  <div className="font-semibold text-gray-900">James Fitzpatrick</div>
                  <div className="text-gray-600 text-sm">Business Economics '28</div>
                </div>
              </div>
              <p className="text-gray-700 italic leading-relaxed">
                "Thanks to AYP, I was able to get professional headshots and interview clothing that helped me start interviewing for my dream roles. This support made all the difference."
              </p>
            </div>

            <div className="bg-white rounded-lg p-8 shadow-md fade-in">
              <div className="flex items-center mb-4">
                <div className="w-12 h-12 bg-uci-gold rounded-full flex items-center justify-center text-uci-navy font-bold text-lg mr-4">
                  JS
                </div>
                <div>
                  <div className="font-semibold text-gray-900">Elle Hsu</div>
                  <div className="text-gray-600 text-sm">Business Administration '27</div>
                </div>
              </div>
              <p className="text-gray-700 italic leading-relaxed">
                "The transportation assistance allowed me to attend multiple career fairs and networking events. I'm grateful for the opportunities this program provided."
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default Impact

