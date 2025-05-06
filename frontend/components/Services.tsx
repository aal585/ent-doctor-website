export function Services() {
  return (
    <section id="services" className="py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">Our Services</h2>
          <p className="text-lg text-gray-600">
            Comprehensive ENT care using advanced medical technologies
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {/* Service 1 */}
          <div className="bg-white rounded-lg shadow-md overflow-hidden">
            <img
              src="/images/services/hearing.jpg"
              alt="Hearing Test"
              className="w-full h-48 object-cover"
            />
            <div className="p-6">
              <h3 className="text-lg font-semibold mb-2">Hearing Test</h3>
              <p className="text-gray-600 mb-4">
                Complete hearing evaluation using state-of-the-art equipment
              </p>
              <button className="w-full px-4 py-2 text-sm font-medium text-primary border border-primary rounded-md hover:bg-primary hover:text-white transition-colors">
                Learn More
              </button>
            </div>
          </div>

          {/* Service 2 */}
          <div className="bg-white rounded-lg shadow-md overflow-hidden">
            <img
              src="/images/services/sinus.jpg"
              alt="Sinus Surgery"
              className="w-full h-48 object-cover"
            />
            <div className="p-6">
              <h3 className="text-lg font-semibold mb-2">Sinus Surgery</h3>
              <p className="text-gray-600 mb-4">
                Advanced endoscopic sinus procedures
              </p>
              <button className="w-full px-4 py-2 text-sm font-medium text-primary border border-primary rounded-md hover:bg-primary hover:text-white transition-colors">
                Learn More
              </button>
            </div>
          </div>

          {/* Service 3 */}
          <div className="bg-white rounded-lg shadow-md overflow-hidden">
            <img
              src="/images/services/sleep.jpg"
              alt="Sleep Apnea Treatment"
              className="w-full h-48 object-cover"
            />
            <div className="p-6">
              <h3 className="text-lg font-semibold mb-2">Sleep Apnea Treatment</h3>
              <p className="text-gray-600 mb-4">
                Comprehensive treatment for sleep-related breathing disorders
              </p>
              <button className="w-full px-4 py-2 text-sm font-medium text-primary border border-primary rounded-md hover:bg-primary hover:text-white transition-colors">
                Learn More
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
