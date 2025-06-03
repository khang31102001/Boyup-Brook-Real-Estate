import { Footer } from "../components";
import Title from "../components/Common/Title";

const Summary = () => {
  return (
    <section className="min-h-screen">
      <div className="bg-gradient-to-br from-white via-slate-50 to-white py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto text-center">

          <Title
            mainTitle="121 Hectares of Prime Rural Lifestyle Land"
            subtitle="Just 25 minutes from Bridgetown, this rare 121-hectare property in Western Australia's scenic South West region offers an unparalleled blend of peaceful rural living, fertile land, and long-term growth potential."
            className="text-emerald-900"
          />

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 text-left">

            <div className="p-8 bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-100">
              <h3 className="text-xl font-semibold text-emerald-900 mb-4">
                Key Features
              </h3>
              <ul className="list-disc list-inside text-gray-700 space-y-3 text-base leading-relaxed">
                <li>121 hectares of gently undulating land</li>
                <li>Sealed road frontage and multiple access gates</li>
                <li>Fertile soil, water sources: dam & soak</li>
                <li>Perfect for farming, eco-tourism, lifestyle retreat</li>
              </ul>
            </div>

            <div className="p-8 bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-100">
              <h3 className="text-xl font-semibold text-emerald-900 mb-4">
                Investment Potential
              </h3>
              <ul className="list-disc list-inside text-gray-700 space-y-3 text-base leading-relaxed">
                <li>High-growth South West investment corridor</li>
                <li>Rare large acreage holding</li>
                <li>Land banking & capital growth opportunity</li>
                <li>Private inspections available anytime</li>
              </ul>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </section>

  );
};

export default Summary;